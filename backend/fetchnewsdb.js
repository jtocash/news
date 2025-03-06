
const express = require("express");
const router = express.Router()
const API_KEY = "0b3e212a535845d9945e3695aeabd748\n";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

router.get('/fetchnews', (req, res) => {
    res.json({ message: "tseting this file" });
});

router.get('/fetchnews2', async (req, res) => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0b3e212a535845d9945e3695aeabd748`);

            if (!response.ok) {throw new Error("ts failed")}

            const data = await response.json()

            console.log(data)

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
        const firstFiveContents = firstFiveArticles.map(article => article.content);

        res.json(firstFiveContents)

    } catch (error) {
        res.json(error);

    }
})


module.exports = router