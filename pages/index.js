import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_SCRIPT } from '../lib/api/definitions';
import dynamic from 'next/dynamic'
const Editor = dynamic(import('../lib/editor'), {ssr: false})

function IndexPage() {
  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const [code, setCode] = useState("");
  const createScript = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          attributes: {
            title: "Untitled",
            visibility: "public",
            code: code,
            description: "",
          },
        }
      }
    });
    if (result.data.createScript.errors) {
      window.location.href = `/s/${result.data.createScript.script.slug}`;
    }
  }
  return (
    <div>
      <nav className="navbar py-4">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <svg style={{width:'24px',height:'24px'}} className="mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2Z" />
              </svg>
              <div className="has-text-weight-bold is-size-5">Tooltip</div>
            </a>
            <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
            <div className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item" href="#about">About</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className="my-6 py-3 columns is-multiline">
            <div className="column is-12 is-6-desktop">
              <h1 className="mb-4 is-size-1 is-size-3-mobile has-text-weight-bold">A Faster Way to Build and Share Apps</h1>
              <h5 className="subtitle has-text-grey mb-5">We turn your scripts into full blown apps. No HTML or CSS required.</h5>
              <a className="button is-info is-large" href="#try-now">
                Try Now
              </a>
            </div>
            <div className="column is-12 is-6-desktop"></div>
          </div>
        </div>
      </section>
      <section className="section has-background-info" id="try-now">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="title is-size-3 has-text-white">Edit the code here.</div>
              <div>
                {typeof window !== "undefined" && (
                  <Editor code={code} setCode={setCode} />
                )}
              </div>
              <button onClick={() => {
                window.__bs_run(code);
              }} className="button is-primary">Run</button>
              <button className="button" onClick={createScript}>
                Save
              </button>
            </div>
            <div className="column">
              <div className="title is-size-3 has-text-white">Your app shows up here.</div>
              <div id="main-view">
                <div id="temporary-id" className="dotted-border"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column title is-size-1">
              How does it work?
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default IndexPage;