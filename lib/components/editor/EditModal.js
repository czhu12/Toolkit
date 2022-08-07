import React, { useState } from "react";
import Modal from "../common/Modal";
import { UPDATE_SCRIPT } from "../../api/definitions";
import { useMutation } from '@apollo/client';

function EditModal({script, show, setShow}) {
  const [newScript, setNewScript] = useState(script);
  const [mutateFunction, { d, l, e }] = useMutation(UPDATE_SCRIPT);
  const saveChanges = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          id: newScript.id,
          attributes: {
            slug: newScript.slug,
            title: newScript.title,
            visibility: newScript.visibility,
            code: newScript.code,
            description: newScript.description,
          },
        }
      }
    });
    window.location.href = `/s/${result.data.updateScript.script.slug}/edit`;
  }

  return (
    <Modal show={show} setShow={setShow} title="Edit App" onSave={saveChanges}>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Slug</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <p className="control">
              <a className="button is-static">
                https://trytoolkit.com/s/
              </a>
            </p>
            <p className="control is-full-width">
              <input className="input" type="text" onChange={(e) => setNewScript({...newScript, slug: e.target.value})} value={newScript.slug} />
            </p>
          </div>
        </div>
      </div>
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
            <div className="control">
              <div className="select">
                <select value={newScript.visibility} onChange={(e) => {
                  setNewScript({...newScript, visibility: e.target.value});
                }}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditModal;