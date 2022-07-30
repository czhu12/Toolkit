import React, { useState } from "react";
import { LOGIN } from '../../lib/api/definitions';
import { useMutation } from '@apollo/client';
import { login } from "../../lib/components/accounts/utils";
import { withDefaultHeaders } from "../../lib/components/common/headers";

function IndexPage() {
  const [mutateFunction] = useMutation(LOGIN);
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await mutateFunction({
      variables: {
        input: {
          credentials: form,
        }
      }
    });
    if (!result.data.signInUser.errors) {
      login(result.data.signInUser.token);
      window.location.href = "/accounts/me"
    } else {
      alert(result.data.signInUser.errors);
    }
  }

  return (
    <div className="section">
      <div className="container is-max-desktop">
      <article className="message">
        <div className="message-header">
          <div className="title has-text-white">Login</div>
        </div>
          <div className="message-body">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label mt-3" htmlFor="email">Email</label>
                <div className="control has-icons-left">
                  <input className="input" type="email" placeholder="Email" name="email" onChange={handleChange}/><span className="icon is-left"><i className="fa fa-envelope"></i></span>
                </div>
                <div className="columns mt-2">
                  <div className="column">
                    <label className="label" htmlFor="password">Password</label>
                    <div className="control has-icons-left">
                      <input className="input" type="password" placeholder="Password" name="password" onChange={handleChange}/><span className="icon is-left"><i className="fa fa-key"></i></span>
                    </div>
                  </div>
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-medium is-primary">Login</button>
                  </div>
                  <div className="control">
                    <a className="button is-medium" href="/accounts/sign_up">Register</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </article>
      </div>
    </div>
  )
}

export default withDefaultHeaders(IndexPage);