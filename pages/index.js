import React, { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SCRIPT, GET_POPULAR_SCRIPTS } from '../lib/api/definitions';
import dynamic from 'next/dynamic'
import ActionBar from "../lib/components/editor/ActionBar";
import Head from "next/head";
import NavbarLogo from "../lib/components/common/NavbarLogo";
import DisplayScripts from "../lib/components/common/scripts/DisplayScripts";
import Link from "next/link";
const Editor = dynamic(import('../lib/components/editor'), {ssr: false})
const DEFAULT_CODE = `import jspdf from "https://cdn.skypack.dev/jspdf";

bs.text(\`# PDF generator\`);

const name = bs.input("Your Name");

if (bs.button("Generate")) {
  const doc = new jspdf();
  const image = new Image();
  image.src = "/images/harvard_diploma.png";
  await doc.addImage(image, "png", 0, 0, 200, 150);

  doc.text(name, 85, 80);
  doc.save("diploma.pdf");
}
`;

function IndexPage() {
  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const { loading, error, data } = useQuery(GET_POPULAR_SCRIPTS, {variables: {page: 1}});
  const [code, setCode] = useState(DEFAULT_CODE);
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
    if (!result.data.createScript.errors) {
      window.location.href = `/s/${result.data.createScript.script.slug}?first=1&created=true`;
    }
  }
  const [barActive, setBarActive] = useState(false);
  return (
    <div>
      <Head>
        <title>Tooltip • The easiest way to build and share apps.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          content="Tooltip is the easiest way to build and share interactive apps, no frontend experience required."
          name="description"
        />
      </Head>
      <nav className="navbar py-4">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <NavbarLogo />
            <a className="navbar-burger" role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setBarActive(!barActive)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>
          <div className={`navbar-menu ${barActive && 'is-active'}`} id="navbarBasicExample">
            <div className="navbar-start">
              <a className="navbar-item" href="#about">About</a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a href="/accounts/sign_up" className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a href="/accounts/login" className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className="my-3 py-3 columns is-multiline">
            <div className="column is-12 is-5-desktop">
              <h1 className="mb-5 is-size-1 is-size-3-mobile has-text-weight-bold" style={{lineHeight: '1.2em'}}>A Faster Way to Build and Share Apps</h1>
              <h5 className="subtitle has-text-grey my-5">We turn your scripts into full blown apps. No HTML or CSS required.</h5>
              <a className="button is-info is-large my-5 is-size-5" href="#try-now">
                Try Tooltip Now
              </a>
              <div className="mt-3 subtitle is-size-7">
                No account needed.
              </div>
            </div>
            <div className="column is-12 is-7-desktop">
              <img src="/images/screenshot-with-code.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="try-now">
        <div className="container">
          <div className="title is-size-1">
            Build apps entirely in browser.
          </div>
          <div className="columns">
            <div className="column">
              <div>
                {typeof window !== "undefined" && (
                  <Editor code={code} setCode={setCode} />
                )}
              </div>
              <ActionBar onSave={createScript} onRun={() => {
                window.__bs_run(code);
              }} />
            </div>
            <div className="column">
              <div id="main-view">
                <div id="your-app-here" className="dotted-border">
                  <div className="subtitle">Your app here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="title is-size-1">
            A gallery of popular apps
          </div>
          {data?.scripts && (
            <div>
              <DisplayScripts scripts={data?.scripts} />
              <div className="has-text-centered mt-5 subtitle is-10">
                <Link href="/browse">See More</Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="title is-size-1">
                Build beautiful applications, no frontend skills needed.
              </div>
              <div className="subtitle is-size-3">
                Build beautiful applications, no frontend skills needed.
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="content container my-5">
          <div className="columns">
            <div className="column">
              <span className="title is-5">Tooltip</span>
            </div>
            <div className="column">
              <span className="title is-5">Documentation</span>
            </div>
            <div className="column">
              <span className="title is-5">Social</span>
              <p>
                <a href="https://github.com/czhu12/tooltip" target="_blank"><i className="fa-brands fa-github"></i></a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default IndexPage;