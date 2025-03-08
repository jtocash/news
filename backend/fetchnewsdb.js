const pool = require('./db');
const express = require("express");
const router = express.Router()
const API_KEY = "0b3e212a535845d9945e3695aeabd748\n";
const BASE_URL = "https://newsapi.org/v2/top-headlines";
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability')
require('dotenv').config();
const OpenAI = require("openai");
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
const newsapikey = process.env.NEWS_API_KEY



router.get('/fetchnews2', async (req, res) => {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsapikey}`);

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

        const selectedArticles = data.articles.slice(0, 20); // get articles
        const selectedContents = selectedArticles.map(article => ({
            url: article.url,
            title: article.title,
            content: article.content
        }));

        res.json(selectedContents)

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
            title: article.title,
            body:""
        };

        const bodytext = await extractArticleContent(article.url)
        data.body = bodytext
        if (bodytext !== 'Content extraction failed')
        {
            try {
                let openairesponse = await summarize(bodytext)
                data.title = openairesponse.title
                data.body = openairesponse.summary
            }
            catch (error)
            {
                console.log(error)
            }
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

async function extractArticleContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch article: ${response.status}`);

        const html = await response.text(); // Get HTML as text

        const dom = new JSDOM(html, { url, resources: "usable"  });
        const article = new Readability(dom.window.document).parse();
        console.log(article?.textContent)

        return article?.textContent || "Content extraction failed";
    } catch (error) {
        console.error(`Failed to extract content from ${url}:`, error.message);
        return "Content extraction failed";
    }
}

async function summarize(body)
{
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            { "role": "system", "content": "You are an AI assistant that summarizes news articles and provides unbiased, objective titles." },
            { "role": "user", "content": "Make a summary of the news article and an unbiased, objective title. Respond in JSON format with keys 'title' and 'summary'." },
            { "role": "user", "content": body }
        ],
        response_format: { type: "json_object" }
    });
    const data = JSON.parse(response.choices[0].message.content);
    return data
}





module.exports = router