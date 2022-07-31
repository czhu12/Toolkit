import React, { useState } from "react";
import dynamic from 'next/dynamic'
import EditModal from "./EditModal";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import ActionBar from "./ActionBar";

const Editor = dynamic(import('./index'), {ssr: false})


function App({initialScript, saveScript}) {
  const [script, setScript] = useState(initialScript);
  const [showEditModal, setShowEditModal] = useState(false);
  const run = () => {
    saveScript(script);
    window.__bs_run(script.code);
  }

  return <div>
    <div className="columns">
      <div className="column">
        <Editor code={script.code} setCode={(code) => setScript({...script, code})} />
      </div>
      <div className="column">
        <div id="main-view"></div>
      </div>
    </div>
    <ActionBar
      onRun={run}
      onSave={async () => {
          await saveScript(script);
          const notfy = new Notyf();
          notfy.success("Saved");
      }}
      onEdit={() => setShowEditModal(true)}
    />
    <EditModal
      show={showEditModal}
      setShow={setShowEditModal}
      script={script}
    />
  </div>
}

export default App;