import React, { useState } from "react";
import { useAuth } from "../accounts/utils";

function NewModal({show, setShow}) {
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
              <p className="has-text-centered">Share your link</p>
              <div className="field has-addons">
                <p className="control">
                  <button
                    className="button is-link"
                    onClick={() => {
                      navigator.clipboard.writeText(currentUrl)
                    }}>
                    copy link
                  </button>
                </p>
                <p className="control is-expanded">
                  <input className="input" type="text" value={currentUrl} disabled/>
                </p>
              </div>
              {!currentUser &&
                <div className="has-text-centered">
                  <a className="button is-primary" href="/accounts/sign_up">
                    Create an account
                  </a>
                </div>
              }
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
