import React, { useState } from "react";
import { useAuth } from "./utils";
import Modal from "../common/Modal";
import { UPDATE_CURRENT_USER } from "../../api/definitions";
import { useMutation } from "@apollo/client";

export default function ProfileSettings({show, setShow}) {
  const { currentUser } = useAuth();

  if (!currentUser) return <div></div>;
  const [form, setForm] = useState({ personalWebsite: currentUser?.personalWebsite });

  const handleChange = (e) => setForm({[e.target.name]: e.target.value})

  const [mutateFunction, { d, l, e }] = useMutation(UPDATE_CURRENT_USER);
  const updateUser = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          id: `User-${currentUser.id}`,
          attributes: form,
        }
      }
    });
    if (!result.data.updateCurrentUser.errors) {
      setShow(false);
    }
  }

  return <Modal show={show} setShow={setShow} title="Settings">
        <fieldset disabled>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className="input" type="text" value={currentUser.username} readOnly />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" value={currentUser.email} readOnly />
            </div>
          </div>
          
        </fieldset>
        <div className="field mt-2">
          <label className="label">Personal Website</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={form.personalWebsite}
              name="personalWebsite"
              onChange={handleChange}
              placeholder="https://www.yourwebsite.com"
            />
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <a className="button is-primary" onClick={updateUser}>
              Submit
            </a>
          </p>
          <p className="control">
            <a className="button is-light" onClick={() => setShow(false)}>
              Cancel
            </a>
          </p>
        </div>
      </Modal>;
}