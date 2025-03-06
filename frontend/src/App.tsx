
// @ts-ignore
import {fetchTopNews} from "./newsapi.ts";
// @ts-ignore
import {nodetest} from "./newsapi.ts";
import ExpandableText from "./components/Expandabletext.tsx";
import './App.css'
import {get5content} from "./newsapi.ts";
import {refreshnews} from "./newsapi.ts";


const newsarray: string[] = await get5content()




function App() {


    return (
    <>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ExpandableText text={newsarray[0]} maxLength={50}> </ExpandableText>
            <ExpandableText text={newsarray[1]} maxLength={50}> </ExpandableText>
            <ExpandableText text={newsarray[2]} maxLength={50}> </ExpandableText>
            <ExpandableText text={newsarray[3]} maxLength={50}> </ExpandableText>
            <ExpandableText text={newsarray[4]} maxLength={50}> </ExpandableText>

        </div>


        <button onClick={refreshnews} style={{marginTop: "2rem"}}> Refresh News </button>





    </>
  );
}

export default App
