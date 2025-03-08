
export const get5content = async () => {
        try {
            const response = await fetch(`http://localhost:1337/getnewest`);

            if (!response.ok) {throw new Error("ts failed")}

            let data = await response.json()
            data = data.map((response: { body: string; }) => response.body)
            return data


        }
        catch (error) {
            console.log(error)}
    }
;

export const get5url = async () => {
        try {
            const response = await fetch(`http://localhost:1337/getnewest`);

            if (!response.ok) {throw new Error("ts failed")}

            let data = await response.json()
            data = data.map((response: { url: string;}) => response.url)
            console.log(data)
            return data


        }
        catch (error) {
            console.log(error)}
    };

export const get5title = async () => {
    try {
        const response = await fetch(`http://localhost:1337/getnewest`);

        if (!response.ok) {throw new Error("ts failed")}

        let data = await response.json()
        data = data.map((response: { title: string;}) => response.title)
        console.log(data)
        return data


    }
    catch (error) {
        console.log(error)}
};




export const refreshnews = async () => {
        try {
            await fetch(`http://localhost:1337/dbclear`);
            await fetch(`http://localhost:1337/setup`);
            await fetch(`http://localhost:1337/addnews`);
            console.log("updated news")

        }
        catch (error) {
            console.log(error)}
    }
;
