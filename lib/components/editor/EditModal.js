import React, { useState } from "react";
import Modal from "../common/Modal";

function EditModal({script, show, setShow}) {
  const [newScript, setNewScript] = useState(script);
  return (
    <Modal show={show} setShow={setShow} title="Edit Script">
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Title</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input className="input" type="text" onChange={(e) => setNewScript({...newScript, title: e.target.value})} value={newScript.title} />
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Description</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <textarea value={newScript.description} onChange={(e) => setNewScript({...newScript, description: e.target.value})} className="textarea" placeholder="Description of tool" />
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Visibility</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <div className="select">
                <select value={newScript.visibility} onChange={(e) => {
                  setNewScript({...newScript, visibility: e.target.value});
                }}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditModal;