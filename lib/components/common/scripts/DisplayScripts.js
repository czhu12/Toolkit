import React from "react";
import chunk from "lodash/chunk";
import ScriptCard from "./ScriptCard";

function DisplayScripts({scripts, n=2}) {
  return (
    <div>
      {scripts.length === 0 && (
        <div className="my-5 py-5 subtitle is-4 has-text-centered">
          Nothing here yet
        </div>
      )}
      {scripts.length >= 0 && (
        <div>
          {chunk(scripts || [], n).map((ss, idx) => {
            return (
              <div key={`gallery-${idx}`} className="columns is-tablet">
                {ss.map((script) => {
                  return <div className={`column is-${12 / n}`}>
                    <ScriptCard script={script} />
                  </div>
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DisplayScripts;