import { CREATE_SCRIPT, GET_SCRIPT } from '../../lib/api/definitions';
import { useEffect, useState } from 'react';
import NewModal from '../../lib/components/runner/NewModal';
import JSConfetti from 'js-confetti'
import Head from 'next/head';
import client from '../../apollo-client';
import { useMutation } from '@apollo/client';
import { AuthProvider, useAuth } from '../../lib/components/accounts/utils';
import Modal from '../../lib/components/common/Modal';

export async function getServerSideProps({query}) {
  const response = await client.query({
    query: GET_SCRIPT,
    variables: {
      slug: query.slug,
    },
  });

  return {
    props: {
      data: response.data, // will be passed to the page component as props
      initialShowModal: !!query.created,
    }
  }
}

function AppNavbar({ script }) {
  const { currentUser } = useAuth();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const forkApp = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          attributes: {
            title: `${script.title} Forked`,
            description: script.description,
            visibility: "public",
            code: script.code,
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
      <Modal show={showStatisticsModal} setShow={setShowStatisticsModal} title="Statistics">
        <div className="title has-text-centered is-1">
          {script.runCount}
        </div>
        <div className="subtitle has-text-centered is-6">Run Count</div>
      </Modal>
      <nav className="navbar">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-items"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="container">
          <div className={`navbar-menu ${navbarOpen && 'is-active'}`} id="navbar-items">
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <i className="fa-solid fa-gear"></i>
                </a>

                <div className="navbar-dropdown">
                  {script.user?.id === currentUser?.id && (
                    <a className="navbar-item" href={`/s/${script.slug}/edit`}>
                      Edit
                    </a>
                  )}
                  {script.user?.id !== currentUser?.id && (
                    <a className="navbar-item" href={`/s/${script.slug}/edit`}>
                      View Source
                    </a>
                  )}
                  {currentUser && (
                    <a className="navbar-item" onClick={forkApp}>
                      Fork
                    </a>
                  )}
                  {!currentUser && (
                    <a className="navbar-item" href="/sign_up">
                      Create an Account to Fork
                    </a>
                  )}
                  <a className="navbar-item" onClick={() => setShowStatisticsModal(true)}>
                    Statistics
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function RunScript({data, initialShowModal}) {
  const [showModal, setShowModal] = useState(initialShowModal);
  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("created")) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
  }, []);

  useEffect(() => {
    window.__kit_run(data.script.code);
  }, []);

  return (
    <div>
      <Head>
        <title>{data.script.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={data.script.description}/>
      </Head>
      {
        data?.script &&
        <div>
          <AuthProvider lazy={false}>
            <AppNavbar script={data.script} />
            <NewModal show={showModal} setShow={setShowModal} />
          </AuthProvider>
        </div>
      }
      <div className="thin-container container">
        <div id="main-view">
        </div>
      </div>
    </div>
  )
}

export default RunScript