import React, { useState } from "react";
import chunk from "lodash/chunk";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SCRIPT, GET_POPULAR_SCRIPTS } from '../lib/api/definitions';
import dynamic from 'next/dynamic'
import ActionBar from "../lib/components/editor/action_bar";
import ScriptCard from "../lib/components/landing_page/script_card";
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
const POPULAR_SCRIPTS = [
  {
    title: "Universal Converter",
    slug: "12345",
    description: "Convert an image into any other format!",
  },
  {
    title: "Bionic Reading Converter",
    slug: "12346",
    description: "Turn your ebooks into bionic readers!",
  },
  {
    title: "Github Cover Photo",
    slug: "12347",
    description: "Show off your Github!",
  },
  {
    title: "Mugshot Bot",
    slug: "12348",
    description: "Generate a mugshot of your blog post.",
  },
];

function IndexPage() {
  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const { loading, error, data } = useQuery(GET_POPULAR_SCRIPTS);
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
  return (
    <div>
      <nav className="navbar py-4">
        <div className="container is-fluid">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <figure className="image is-24x24">
                <img src="/logos/tooltip-purple.png" />
              </figure>

              <div className="has-text-weight-bold is-size-5 has-color-purple ml-3">Tooltip</div>
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
          <div className="my-3 py-3 columns is-multiline">
            <div className="column is-12 is-6-desktop">
              <h1 className="mb-4 is-size-1 is-size-3-mobile has-text-weight-bold" style={{lineHeight: '1.2em'}}>A Faster Way to Build and Share Apps</h1>
              <h5 className="subtitle has-text-grey my-4">We turn your scripts into full blown apps. No HTML or CSS required.</h5>
              <a className="button is-info is-large is-size-5" href="#try-now">
                Try Now
              </a>
              <div className="mt-3 subtitle is-size-7">
                No account needed.
              </div>
            </div>
            <div className="column is-12 is-6-desktop"></div>
          </div>
        </div>
      </section>
      <section className="section" id="try-now">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="title is-size-3 has-text-white">Edit the code here.</div>
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
              A gallery of popular apps
            </div>
          </div>
            {chunk(POPULAR_SCRIPTS, 2).map((scripts) => {
              const s1 = scripts[0];
              const s2 = scripts[1];
              return (
                <div className="columns is-desktop">
                  <div className="column">
                    <ScriptCard script={s1} />
                  </div>
                  <div className="column">
                    <ScriptCard script={s2} />
                  </div>
                </div>
              );
            })}
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
        <div className="content has-text-centered">
          <p>
            Hello world!
          </p>
        </div>
      </footer>
    </div>
  )
}

export default IndexPage;