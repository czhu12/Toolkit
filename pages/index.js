import React, { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SCRIPT, GET_SCRIPTS } from '../lib/api/definitions';
import dynamic from 'next/dynamic'
import ActionBar from "../lib/components/editor/ActionBar";
import Head from "next/head";
import NavbarLogo from "../lib/components/common/navigation/NavbarLogo";
import DisplayScripts from "../lib/components/common/scripts/DisplayScripts";
import Link from "next/link";
import { AuthProvider, useAuth } from "../lib/components/accounts/utils";

function GithubCorner() {
  return (
    <div>
      <style>{`.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}`}</style>
      <a href="https://github.com/czhu12/Toolkit" className="github-corner" aria-label="View source on GitHub">
        <svg width="80" height="80" viewBox="0 0 250 250" style={{zIndex: "1000", fill: "#151513", color: "#fff", position: "absolute", top: "0", border: "0", right: "0"}} aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: "130px 106px;"}} className="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
        </svg>
      </a>
    </div>
  );
}

const FEATURES = [
  [
    {
      title: "Turn scripts into apps",
      description: "Toolkit turns your scripts into full blown, interactive applications.",
      icon: "fa-solid fa-lightbulb",
    },
    {
      title: "No HTML / CSS required",
      description: "So you can focus on getting things done.",
      icon: "fa-solid fa-code",
    },
    {
      title: "Full javascript",
      description: "Toolkit won't hold you back, do anything javascript can do.",
      icon: "fa-brands fa-square-js",
    },
  ],
  [
    {
      title: "No installation",
      description: "Develop entirely in browser, no installation required.",
      icon: "fa-solid fa-computer-mouse",
    },
    {
      title: "Freely hosted, forever",
      description: "Don't stress about figuring out deployments and hosting, Toolkit can do it for you!",
      icon: "fa-solid fa-cloud",
    },
    {
      title: "Embed into your app",
      description: "Toolkit is fully open source. Use your Toolkit apps within your application (coming soon).",
      icon: "fa-solid fa-window-restore",
    },
  ],
];
const Editor = dynamic(import('../lib/components/editor'), {ssr: false})
const DEFAULT_CODE = `import jspdf from "https://cdn.skypack.dev/jspdf";

kit.text(\`# PDF generator\`);

const name = kit.input("Your Name");

if (kit.button("Generate")) {
  const doc = new jspdf();
  const image = new Image();
  image.src = "/images/harvard_diploma.png";
  await doc.addImage(image, "png", 0, 0, 200, 150);

  doc.text(name, 85, 80);
  doc.save("diploma.pdf");
}
`;

function AuthAwareNavbar({barActive}) {
  const {currentUser} = useAuth();

  return (
    <nav className="navbar py-4">
      <div className="container">
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
            <a className="navbar-item" href="#try-now">Try Now</a>
          </div>
          <div className="navbar-end">
            {!currentUser && (
              <div className="navbar-item">
                <div className="buttons">
                  <a href="/sign_up" className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </div>
              </div>
            )}
            {currentUser && (
              <div className="navbar-item">
                <a href="/me">
                  My Apps&nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function IndexPage() {
  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const { loading, error, data } = useQuery(GET_SCRIPTS, {variables: {page: 1}});
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
      window.location.href = `/s/${result.data.createScript.script.slug}?created=true`;
    }
    document.cookie = `script_id=${result.data.createScript.script.slug}`

  }
  const [barActive, setBarActive] = useState(false);
  return (
    <AuthProvider lazy={false}>
      <div>
        <Head>
          <title>Tooltip • The easiest way to build and share apps.</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            content="Tooltip is the easiest way to build and share interactive apps, no frontend experience required."
            name="description"
          />
        </Head>
        <AuthAwareNavbar barActive={barActive} />
        <GithubCorner />
        <section className="section has-background-light">
          <div className="container">
            <div className="my-3 py-3 columns is-multiline">
              <div className="column is-12 is-5-desktop">
                <h1 className="mb-5 is-size-1 is-size-3-mobile has-text-weight-bold" style={{lineHeight: '1.2em'}}>A Faster Way to Build and Share Apps</h1>
                <h5 className="subtitle has-text-grey my-5">We turn your scripts into full blown apps. No HTML or CSS required.</h5>
                <a className="button is-info is-large my-3 is-size-5" href="#try-now">
                  Try Tooltip Now
                </a>
                <div className="mt-1 subtitle is-size-7">
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
            <div className="title is-size-1 my-3">
              Build apps entirely in browser
            </div>
            <div className="columns">
              <div className="column">
                <div className="mb-3">
                  {typeof window !== "undefined" && (
                    <Editor code={code} setCode={setCode} />
                  )}
                </div>
                <ActionBar onSave={createScript} onRun={() => {
                  window.__kit_run(code);
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
            {data?.scripts?.scripts && (
              <div>
                <DisplayScripts scripts={data.scripts.scripts} />
                <div className="has-text-centered mt-5 pt-5 subtitle is-10">
                  <Link href="/browse">
                    <span className="pointer">
                      See More <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="title is-size-1">
              Build beautiful applications, no HTML or CSS required.
            </div>
            {FEATURES.map(row => {
              return (
                <div className="columns">
                  {
                    row.map(feature => {
                      return (
                        <div className="column">
                          <div className="card is-full-height">
                            <div className="card-content">
                              <div className="my-4">
                                <i className={`${feature.icon} title is-2`}></i>
                              </div>
                              <div className="subtitle is-5">{feature.title}</div>
                              <div className="subtitle">{feature.description}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              )
            })}
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

    </AuthProvider>
  )
}

export default IndexPage;
