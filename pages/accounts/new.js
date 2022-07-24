import React, { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';


function IndexPage() {
  return (
    <div class="section">
      <div class="container is-max-desktop">
      <article class="message">
  <div class="message-header">
  <div class="title has-text-white">Sign Up</div>

  </div>
  <div class="message-body">
  <form id="register-form">
          <div class="field">
            <label class="label" for="username">Username</label>
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="Username" name="username"/><span class="icon is-left"><i class="fa fa-user"></i></span>
            </div>
            <label class="label mt-3" for="email">Email</label>
            <div class="control has-icons-left">
              <input class="input" type="email" placeholder="Email" name="email"/><span class="icon is-left"><i class="fa fa-envelope"></i></span>
            </div>
            <div class="columns mt-2">
              <div class="column">
                <label class="label" for="password">Password</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" placeholder="Password" name="password"/><span class="icon is-left"><i class="fa fa-key"></i></span>
                </div>
              </div>
              <div class="column">
                <label class="label" for="retypePassword">Re-Type Password</label>
                <div class="control has-icons-left">
                  <input class="input" type="password" placeholder="Confirm Password" name="retypePassword"/><span class="icon is-left"><i class="fa fa-lock"></i></span>
                </div>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-medium">Login</button>
              </div>
              <div class="control">
                <button class="button is-primary is-medium" type="submit">Register</button>
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

export default IndexPage;