import React, { useState } from "react";

function ScriptCard({script}) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="has-text-right">
          <i className="is-3 fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className="title is-5">{script.title}</div>
        <div>{script.description}</div>
      </div>
    </div>
  )
}

export default ScriptCard;