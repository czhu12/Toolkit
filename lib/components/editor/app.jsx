import React, { useState } from "react";
import dynamic from 'next/dynamic'
import EditModal from "./EditModal";
import { Notyf } from "notyf";
import ActionBar from "./ActionBar";

const Editor = dynamic(import('./index'), {ssr: false})


function App({initialScript, saveScript}) {
  const [script, setScript] = useState(initialScript);
  const [showEditModal, setShowEditModal] = useState(false);
  const run = () => {
    saveScript(script);
    window.__kit_run(script.code);
  }

  return (
    <div id="editor-body">
      <div className="columns is-gapless m-0 is-full-height">
        <div className="column editor-code is-8">
          <Editor code={script.code} setCode={(code) => setScript({...script, code})} height="100%" />
          <div className="mx-3">
            <ActionBar
              onRun={run}
              viewApp={`/s/${script.slug}`}
              onSave={async () => {
                await saveScript(script);
                const notfy = new Notyf();
                notfy.success("Saved");
              }}
              onEdit={() => setShowEditModal(true)}
            />
          </div>
        </div>
        <div className="column is-4">
          <div id="main-view"></div>
        </div>
      </div>
      <EditModal
        show={showEditModal}
        setShow={setShowEditModal}
        script={script}
      />
    </div>
  )
}

export default App;
