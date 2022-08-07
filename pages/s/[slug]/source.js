import dynamic from 'next/dynamic'
import Head from "next/head";
import React, { useEffect } from "react";
import hljs from 'highlight.js';
import { CREATE_SCRIPT, GET_SCRIPT } from "../../../lib/api/definitions";
import { Navbar } from "../../../lib/components/common/navigation/Navbar";
import { AuthProvider } from "../../../lib/components/accounts/utils";
import client from "../../../apollo-client";
import { useMutation } from '@apollo/client';
import Link from 'next/link';
const Editor = dynamic(import('../../../lib/components/editor'), {ssr: false})

export async function getServerSideProps({query}) {
  const response = await client.query({
    query: GET_SCRIPT,
    variables: {
      slug: query.slug,
    },
  });

  return {
    props: { data: response.data }
  }
}


function SourcePage({ data }) {
  useEffect(() => {
    hljs.highlightAll();
  }, [])

  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const forkApp = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          attributes: {
            title: `${data.script.title} Forked`,
            description: data.script.description,
            visibility: "public",
            code: data.script.code,
          },
        }
      }
    });
    if (!result.data.createScript.errors) {
      window.location.href = `/s/${result.data.createScript.script.slug}?created=true`;
    }
  }


  return (
    <div>
      <Head>
        <title>Browse Popular Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider lazy={false}>
        <Navbar />
        <div className="container section">
          <div className="my-1 is-size-1 is-size-3-mobile has-text-weight-bold">
            {data.script.title}
          </div>
          <div className="mb-4">
            <Link href={`/s/${data.script.slug}`}>View App</Link>
          </div>
          <div>
            <Editor code={data.script.code} />
          </div>
          <div className="mt-3 has-text-right">
            <button className="button is-primary" onClick={forkApp}>
              <span className="icon">
                <i className="fa-solid fa-code-branch"></i>
              </span>
              <span>Fork</span>
            </button>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}

export default SourcePage;