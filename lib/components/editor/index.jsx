import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chaos";


function Editor({code, setCode, readOnly=false, height="500px"}) {
  return (
    <AceEditor
      showPrintMargin={false}
      readOnly={readOnly}
      width="100%"
      height={height}
      mode="javascript"
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