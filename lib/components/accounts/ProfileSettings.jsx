import React, { useState } from "react";
import { useAuth } from "./utils";
import Modal from "../common/Modal";
import { UPDATE_CURRENT_USER } from "../../api/definitions";
import { useMutation } from "@apollo/client";

export default function ProfileSettings() {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [form, setForm] = useState({ personalWebsite: currentUser?.personalWebsite });
  const [showSuccess, setShowSuccess] = useState(false);
  const { currentUser } = useAuth();

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
      setShowProfileSettings(false);
    }
  }

  return currentUser ? (
    <>
      <a class="navbar-item" onClick={() => setShowProfileSettings(true)}>
        Profile Settings
      </a>
      <Modal show={showProfileSettings} setShow={setShowProfileSettings} title="Settings">
        <fieldset disabled>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" type="text" placeholder={currentUser.username}/>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email" placeholder={currentUser.email}/>
            </div>
          </div>
          
        </fieldset>
        <div class="field mt-2">
          <label class="label">Personal Website</label>
          <div class="control">
            <input
              class="input"
              type="text"
              value={form.personalWebsite}
              name="personalWebsite"
              onChange={handleChange}
              placeholder="https://www.yourwebsite.com"
            />
          </div>
        </div>
        {showSuccess && "Success!"}
        <div class="field is-grouped is-grouped-right">
          <p class="control">
            <a class="button is-primary" onClick={updateUser}>
              Submit
            </a>
          </p>
          <p class="control">
            <a class="button is-light">
              Cancel
            </a>
          </p>
        </div>
      </Modal>
    </>
  ) : <span></span>;
}