
// @ts-ignore
import {addnews, fetchTopNews, get5title, get5url} from "./newsapi.ts";
// @ts-ignore
import {nodetest} from "./newsapi.ts";
import ExpandableText from "./components/Expandabletext.tsx";
import './App.css'
import {get5content} from "./newsapi.ts";
// import {refreshnews} from "./newsapi.ts";


const bodyarray: string[] = await get5content()
const titlearray: string[] = await get5title()




function App() {


    return (
    <>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ExpandableText title={titlearray[0]} text={bodyarray[0]} > </ExpandableText>
            <ExpandableText title={titlearray[1]} text={bodyarray[1]}  > </ExpandableText>
            <ExpandableText title={titlearray[2]} text={bodyarray[2]} > </ExpandableText>
            <ExpandableText title={titlearray[3]} text={bodyarray[3]} > </ExpandableText>
            <ExpandableText title={titlearray[4]} text={bodyarray[4]} > </ExpandableText>
            <ExpandableText title={titlearray[5]} text={bodyarray[5]}> </ExpandableText>
            <ExpandableText title={titlearray[6]} text={bodyarray[6]} > </ExpandableText>
            <ExpandableText title={titlearray[7]} text={bodyarray[7]}> </ExpandableText>
            <ExpandableText title={titlearray[8]} text={bodyarray[8]}> </ExpandableText>
            <ExpandableText title={titlearray[9]} text={bodyarray[9]} > </ExpandableText>


        </div>


        <button onClick={addnews} style={{marginTop: "2rem"}}> Get News </button>







    </>
  );
}

export default App
