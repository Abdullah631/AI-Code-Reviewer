import { useEffect, useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code,setCode]=useState(``)
  const [review,setReview]=useState(``)

  useEffect(()=>{
    prism.highlightAll();
  });

  async function reviewCode() {
  try {
    const response = await axios.post('http://localhost:5000/ai/get-review', { code });
    
    // Extract the actual markdown content
    // Adjust this based on your actual API response structure
    const markdownContent = response.data.response || response.data.message || response.data;
    
    setReview(typeof markdownContent === 'string' ? markdownContent : JSON.stringify(markdownContent));
  } catch (error) {
    console.error("Review error:", error);
    setReview("Error getting review: " + error.message);
  }
}
  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
          value={code}
          onValueChange={code=>setCode(code)}
          highlight={code=>prism.highlight(code,prism.languages.javascript,"javascript")}
          padding={10}
          style={{
            fontFamily:'"Fira code","Fira Mono","monospace"',
            fontSize:17,
            border:"1px solid #ddd",
            borderRadius: "5px",
            height:"100%",
            width:"100%"
          }}
          />
        </div>
        <div  onClick={reviewCode} className="review">Review</div>
      </div>
      <div className="right">
        <Markdown
        rehypePlugins={[rehypeHighlight]}
        >{review}</Markdown>
      </div>
    </main>
    </>
  )
}
function sum(){
  return 1+1;
}
export default App
