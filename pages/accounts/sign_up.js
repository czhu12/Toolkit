import React, { useState } from "react";
import { CREATE_ACCOUNT } from '../../lib/api/definitions';
import { useMutation } from '@apollo/client';
import { login } from "../../lib/components/accounts/utils";
import { withDefaultHeaders } from "../../lib/components/common/headers";

function IndexPage() {
  const [mutateFunction] = useMutation(CREATE_ACCOUNT);
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

    if (!result.data.signUpUser.errors) {
      login(result.data.signUpUser.token);
    } else {
      alert(result.data.errors)
    }
  }

  return (
    <div className="section">
      <div className="container is-max-desktop">
      <article className="message">
        <div className="message-header">
          <div className="title has-text-white">Sign Up</div>
        </div>
          <div className="message-body">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label" htmlFor="username">Username</label>
                <div className="control has-icons-left">
                  <input className="input" type="text" placeholder="Username" name="username" onChange={handleChange}/><span className="icon is-left"><i className="fa fa-user"></i></span>
                </div>
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
                  {/* <div className="column">
                    <label className="label" htmlFor="retypePassword">Re-Type Password</label>
                    <div className="control has-icons-left">
                      <input className="input" type="password" placeholder="Confirm Password" name="retypePassword"/><span className="icon is-left"><i className="fa fa-lock"></i></span>
                    </div>
                  </div> */}
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-primary is-medium" type="submit">Register</button>
                  </div>
                  <div className="control">
                    <a className="button is-medium" href="/accounts/login">Login</a>
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