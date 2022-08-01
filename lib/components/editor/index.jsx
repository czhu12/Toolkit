import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/theme-chaos";


function Editor({code, setCode, height="500px"}) {
  return (
    <AceEditor
      showPrintMargin={false}
      width="100%"
      height={height}
      mode="rust"
      theme="chaos"
      fontSize="1em"
      value={code}
      onChange={(v) => {
        setCode(v);
      }}
      editorProps={{ $blockScrolling: true }}
    />
  )
}

export default Editor;