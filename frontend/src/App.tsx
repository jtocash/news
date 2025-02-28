
// @ts-ignore
import {fetchTopNews} from "./newsapi.ts";
// @ts-ignore
import {nodetest} from "./newsapi.ts";
import ExpandableText from "./components/newsarticle.tsx";
import './App.css'

function App() {

  return (
    <>
        <p>yews 2</p>
        <ExpandableText text={"aaaaaaaaaaaaaaa"} maxLength={10}></ExpandableText>
    </>
  );
}

export default App
