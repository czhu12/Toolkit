import { Notyf } from "notyf";
import React from "react";
import { useAuth } from "../accounts/utils";

function NewModal({show, setShow, script}) {
  const { currentUser } = useAuth();
  let currentUrl;
  if (typeof window !== 'undefined') {
    currentUrl = location.protocol + '//' + location.host + location.pathname;
  }

  return (
    <div className={`modal ${show && 'is-active'}`}>
    <div className="modal-background"></div>
    <div className="modal-content">
      <div className="box">
        <div className="is-pulled-right">
          <button className="delete" aria-label="close" onClick={() => setShow(false)}></button>
        </div>
        <div className="media">
          <div className="media-content">
            <div className="content">
              <h1 className="has-text-centered">Congrats!</h1>
              <p className="has-text-centered">Share your app</p>
              <div className="field has-addons">
                <p className="control">
                  <button
                    className="button is-link"
                    onClick={() => {
                      const notyf = new Notyf();
                      notyf.success("Copied Link");
                      navigator.clipboard.writeText(currentUrl)
                    }}>
                    copy link
                  </button>
                </p>
                <p className="control is-expanded">
                  <input className="input" type="text" value={currentUrl} disabled/>
                </p>
              </div>
              <div>
                <div className="columns">
                  <div className="column">
                    {!currentUser &&
                      <div>
                        <div>
                          <a className="button is-primary" href="/sign_up">
                            Create an account
                          </a>
                        </div>
                        <div className="mt-3 has-text-dark">
                          <i>Without an account, you won't be able to edit this script, or change the URL slug.</i>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="column has-text-right">
                    <a className="button is-info" href={`/s/${script.slug}/edit`}>
                      Continue editing
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button className="modal-close is-large" aria-label="close"></button>
  </div>
  )
}

export default NewModal;
