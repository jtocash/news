const express = require('express');
const pool = require('./db');
const cors = require('cors');
require('dotenv').config();
const fetchnewsroutes = require("./fetchnewsdb")

const app = express();
const PORT = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());
app.use(fetchnewsroutes) // brings in the api from the other file


app.get('/api/message', (req, res) => {
    res.json({ message: "Hello from Node.js backend!" });
});

app.post('/', async (req, res) =>
{
    const {url, body} = req.body
    console.log("Received body:", req.body)
    console.log("url:", url)
    console.log("body:", body)
    try
    {
        await pool.query('INSERT INTO news (url,body) VALUES ($1, $2)', [url, body])
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
        await pool.query('CREATE TABLE news(id SERIAL PRIMARY KEY, url VARCHAR(1000), body TEXT)')

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

//clear database
app.get('/dbclear', async (req,res) =>
{
    try
    {
        data =await pool.query('DROP TABLE news')

        res.json("database deleted")
    }
    catch (err)
    {
        console.log(err)
        res.sendStatus(500)
    }
})




// get the 5 most recently added entry
app.get('/getnewest', async (req,res) =>
{
    try
    {
        data =await pool.query('SELECT * FROM news WHERE body != \'Content extraction failed\' ORDER BY id DESC LIMIT 5')

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
