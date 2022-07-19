import React, { useState } from "react";
import dynamic from 'next/dynamic'
const Editor = dynamic(import('./index'), {ssr: false})


function App({initialScript, saveScript}) {
  const [script, setScript] = useState(initialScript);
  const run = () => {
    window.__bs_run(script.code);
  }

  return <div>
    <nav>
      <div className="columns">
        <div className="column">
          <input onChange={(e) => setScript({...script, title: e.target.value})} value={script.title} className="input" type="text" placeholder="Text input" />
        </div>
        <div className="column">
          <button onClick={run} className="button">
            <span className="icon">
              <i className="fa-solid fa-play"></i>
            </span>
            <span>Run</span>
          </button>
          <button className="button" onClick={() => {
            saveScript(script);
          }}>
            <span className="icon">
              <i className="fa-solid fa-floppy-disk"></i>
            </span>
            <span>Save</span>
          </button>
        </div>
      </div>
    </nav>
    <div className="columns">
      <div className="column">
        <Editor code={script.code} setCode={(code) => setScript({...script, code})} />
      </div>
      <div className="column">
        <div id="main-view"></div>
      </div>
    </div>
  </div>
}

export default App;