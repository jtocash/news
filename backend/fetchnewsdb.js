const pool = require('./db');
const express = require("express");
const router = express.Router()
const API_KEY = "0b3e212a535845d9945e3695aeabd748\n";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

router.get('/fetchnews2', async (req, res) => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=0b3e212a535845d9945e3695aeabd748`);

            if (!response.ok) {throw new Error("ts failed")}

            const data = await response.json()



            res.json(data)


        }
        catch (error) {
            console.log(error)}
    }
)

router.get('/fetchnews3',async (req, res) => {
    try {
        const response = await fetch('http://localhost:1337/fetchnews2'); // Adjust the URL if needed
        if (!response.ok) throw new Error('Failed to fetch news');

        const data = await response.json();

        const firstFiveArticles = data.articles.slice(0, 5); // Get the first 5 articles
        const firstFiveContents = firstFiveArticles.map(article => ({
            url: article.url,
            content: article.content
        }));

        res.json(firstFiveContents)

    } catch (error) {
        res.json(error);

    }
})

router.get('/addnews', async (req,res) => {
    try
    {
        let fivearticles = await fetch('http://localhost:1337/fetchnews3')
        fivearticles = await fivearticles.json()
        for (let article of fivearticles)
        {

            const data = {
                url: article.url,
                body: article.content
            };

            if (data.body == null)
            {
                data.body = "no body"
            }




        const response = await fetch('http://localhost:1337/', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data)
        });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        }


        res.json("good")
    }
    catch (error)
    {
    res.status(500)
    }

})


module.exports = router