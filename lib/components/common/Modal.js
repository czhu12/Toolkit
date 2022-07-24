import React from "react";

function Modal({show, setShow, title, children, onSave}) {
  return (
    <div className={`modal ${show && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={() => setShow(false)} aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={onSave}>
            Save changes
          </button>
          <button className="button" onClick={() => setShow(false)}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal;