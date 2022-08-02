import React from "react";
function showEdit(currentUser, script) {
  if (script.user && script.user.id === currentUser?.id) return true;
  return false;
}

function ScriptCard({ script, currentUser }) {
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
          <div className="mt-3">
            by&nbsp;
            {script.user?.username && script.user?.personalWebsite &&
              <a href={script.user.personalWebsite}>
                {script.user?.username}
              </a>
            }
            {script.user?.username && !script.user?.personalWebsite &&
              <span>
                {script.user?.username}
              </span>
            }
            {!script.user?.username && (
              <span>
                Anonymous
              </span>
            )}
          </div>
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
          {!showEdit(currentUser, script) && (
            <a href={`/s/${script.slug}`}>
              <span>
                Source
              </span>
            </a>
          )}
          {showEdit(currentUser, script) && (
            <a href={`/s/${script.slug}/edit`}>
              <span>
                Edit
              </span>
            </a>
          )}
        </p>
      </footer>
    </div>
  )
}

export default ScriptCard;