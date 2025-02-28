
const API_KEY = "0b3e212a535845d9945e3695aeabd748\n";
const BASE_URL = "https://newsapi.org/v2/top-headlines";

export const fetchTopNews = async () => {
    try {
        const response = await fetch(`${BASE_URL}?country=us&category=politics&apiKey=${API_KEY}`);
        if (!response.ok) {throw new Error("ts failed")}
        const data = await response.json()
        console.log(data)
        return data

        }
        catch (error) {
    console.log(error)}
    }

export const nodetest = async () => {
        try {
            const response = await fetch(`http://localhost:5002/api/message`);
            if (!response.ok) {throw new Error("ts failed")}
            const data = await response.json()
            console.log(data)
            return data

        }
        catch (error) {
            console.log(error)}
    }
;