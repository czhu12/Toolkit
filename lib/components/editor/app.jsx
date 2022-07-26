import React, { useState } from "react";
import dynamic from 'next/dynamic'
import EditModal from "./EditModal";
const Editor = dynamic(import('./index'), {ssr: false})


function App({initialScript, saveScript}) {
  const [script, setScript] = useState(initialScript);
  const [showEditModal, setShowEditModal] = useState(false);
  const run = () => {
    saveScript(script);
    window.__bs_run(script.code);
  }

  return <div>
    <nav>
      <div className="columns">
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
          <button className="button" onClick={() => {
            setShowEditModal(true);
          }}>
            <span className="icon">
              <i className="fa-solid fa-pen"></i>
            </span>
            <span>Edit</span>
          </button>
        </div>
      </div>
    </nav>
    <div className="columns">
      <div className="column py-0">
        <Editor code={script.code} setCode={(code) => setScript({...script, code})} />
      </div>
      <div className="column">
        <div id="main-view"></div>
      </div>
    </div>
    <EditModal
      show={showEditModal}
      setShow={setShowEditModal}
      script={script}
    />
  </div>
}

export default App;