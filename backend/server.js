const express = require('express');
const pool = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());

app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from Neode.js backend!" });
});

app.post('/', async (req, res) =>
{
    const {name, location} = req.body
    console.log("Received body:", req.body)
    console.log("title:", name)
    console.log("body:", location)
    try
    {
        await pool.query('INSERT INTO news (title,body) VALUES ($1, $2)', [name, location])
        res.status(200).send({message: "added"})
    }
    catch (err)
    {
        console.log(err)
        res.sendStatus(500)
    }
});

app.get('/setup', async (req,res) =>
{
    try
    {
        await pool.query('CREATE TABLE news(id SERIAL PRIMARY KEY, title VARCHAR(250), body VARCHAR(1000))')

        res.status(200).send({message: "created"})
    }
    catch (err)
    {
        console.log(err)
        res.sendStatus(500)
    }
})

app.get('/read', async (req,res) =>
{
    try
    {
        data =await pool.query('SELECT * FROM news')

        res.status(200).send(data.rows)
    }
    catch (err)
    {
        console.log(err)
        res.sendStatus(500)
    }
})

// example queries above

// get the most recently added entry
app.get('/getnewest', async (req,res) =>
{
    try
    {
        data =await pool.query('SELECT * FROM news ORDER BY id DESC LIMIT 1')

        res.status(200).send(data.rows)
    }
    catch (err)
    {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(PORT, () =>
{
    console.log(`Server running on http://localhost:${PORT}`) })
