


export const get5content = async () => {
        try {
            const response = await fetch(`http://localhost:1337/fetchnews3`);

            if (!response.ok) {throw new Error("ts failed")}

            const data = await response.json()

            console.log(data)
            return data


        }
        catch (error) {
            console.log(error)}
    }
;