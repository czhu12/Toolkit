import React from "react";

function ScriptCard({script}) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="has-text-right">
          <a href={`/a/${script.slug}`}>
            <i className="is-3 fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
        <div className="title is-5">{script.title}</div>
        <div>{script.description}</div>
        <div>
          <span className="mr-3">
            <i className="mr-1 fa-solid fa-play"></i>
            {script.runCount}
          </span>
          {script.user?.username &&
            <span>
              <i className="fa-solid fa-toolbox mr-1"></i> {script.user?.username}
            </span>
          }
        </div>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <a href={`/s/${script.slug}`}>
            <span>
              View
            </span>
          </a>
        </p>
        <p className="card-footer-item">
          <a href={`/s/${script.slug}/edit`}>
            <span>
              Edit
            </span>
          </a>
        </p>
      </footer>
    </div>
  )
}

export default ScriptCard;