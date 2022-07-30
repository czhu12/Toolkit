import React from "react";
import chunk from "lodash/chunk";
import ScriptCard from "./ScriptCard";

function DisplayScripts({scripts, n=2}) {
  return (
    <div>
      {chunk(scripts || [], n).map((ss, idx) => {
        return (
          <div key={`gallery-${idx}`} className="columns is-desktop">
            {ss.map((script) => {
              return <div className={`column is-${12 / n}`}>
                <ScriptCard script={script} />
              </div>
            })}
          </div>
        );
      })}
    </div>
  );
}

export default DisplayScripts;