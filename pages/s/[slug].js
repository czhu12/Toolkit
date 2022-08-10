import { GET_SCRIPT } from '../../lib/api/definitions';
import { useEffect, useState } from 'react';
import NewModal from '../../lib/components/runner/NewModal';
import JSConfetti from 'js-confetti'
import Head from 'next/head';
import client from '../../apollo-client';
import { AuthProvider } from '../../lib/components/accounts/utils';
import SlugNavbar from '../../lib/components/common/navigation/SlugNavbar';

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
            <SlugNavbar script={data.script} />
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