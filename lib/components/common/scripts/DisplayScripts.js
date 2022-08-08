import React from "react";
import chunk from "lodash/chunk";
import ScriptCard from "./ScriptCard";
import { useAuth } from "../../accounts/utils";

function DisplayScripts({scripts, children, loading=false, n=2}) {
  let currentUser;
  const auth = useAuth();
  if (auth) {
    currentUser = auth.currentUser;
  }
  return (
    <div>
      {scripts.length === 0 && !loading && !children && (
        <div className="my-5 py-5 subtitle is-4 has-text-centered">
          Nothing here yet
        </div>
      )}
      {scripts.length === 0 && !loading && children}
      {scripts.length >= 0 && (
        <div>
          {chunk(scripts || [], n).map((ss, idx) => {
            return (
              <div key={`gallery-${idx}`} className="columns is-tablet">
                {ss.map((script) => {
                  return <div className={`column is-${12 / n}`}>
                    <ScriptCard script={script} currentUser={currentUser} />
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