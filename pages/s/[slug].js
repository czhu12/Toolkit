import { GET_SCRIPT } from '../../lib/api/definitions';
import { useEffect, useState } from 'react';
import NewModal from '../../lib/components/runner/NewModal';
import JSConfetti from 'js-confetti'
import Head from 'next/head';
import client from '../../apollo-client';

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

function RunScript({data, initialShowModal}) {
  const [showModal, setShowModal] = useState(initialShowModal);
  const [navbarOpen, setNavbarOpen] = useState(false);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("created")) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
  }, []);

  useEffect(() => {
    window.__bs_run(data.script.code);
  }, []);

  return (
    <div>
      <Head>
        <title>{data.script.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={data.script.description}/>
      </Head>
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
        <div className={`navbar-menu ${navbarOpen && 'is-active'}`} id="navbar-items">
          <div className="navbar-end">
            <a className="navbar-item" href={`/s/${data.script.slug}/edit`}>
              Edit
            </a>
          </div>
        </div>

      </nav>
      {
        data?.script &&
        <div>
          <NewModal show={showModal} setShow={setShowModal} />
          <div className="thin-container container">
            <div id="main-view">
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default RunScript