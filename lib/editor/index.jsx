import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-chaos";


function Editor({initialCode, saveScript}) {
  const [code, setCode] = useState(initialCode);
  const run = () => {
    window.__bs_run(code);
  }
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{flex: 1}}>
        <AceEditor
          showPrintMargin={false}
          width="100%"
          mode="rust"
          theme="chaos"
          value={code}
          onChange={(v) => {
            setCode(v);
          }}
          editorProps={{ $blockScrolling: true }}
        />
        <button onClick={run}>Run</button>
        <button onClick={() => {
          saveScript({
            title,
            visibility,
            description,
            slug,
            code,
          });
        }}>Save</button>
      </div>
      <div style={{flex: 1}}>
        <div id="main-view"></div>
      </div>
    </div>
  )
}

export default Editor;