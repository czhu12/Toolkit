import React from 'react';
import Head from "next/head";
import { withRouter } from "next/router";


export function withDefaultHeaders(OriginalReactComponent, overrides={}) {
  const DefaultHeaders = class extends React.Component {
     render() {
        //return original react component with additional props
        return (
          <div>
            <Head>
              <title>{overrides.title || "Toolkit • The easiest way to build and share apps."}</title>
              <meta name="description" content={overrides.description || "Toolkit is the easiest way to build and share interactive apps, no frontend experience required."} />
              <meta name="theme-color" content="#000000" />
              <meta property="og:title" content="Toolkip" />
              <meta property="og:url" content="https://trytoolkit.com" />
              <meta property="og:type" content="website" />
              <meta property="og:description" content="toolkit" />
              {/* <meta property="og:image" content="" /> */}
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              {/* <link rel="canonical" href={} /> */}
              <meta charSet="utf-8" />
              <link rel="search" type="application/opensearchdescription+xml" title="Toolkit" href="/opensearch.xml" />
            </Head>
            <OriginalReactComponent {...this.props} />
          </div>
        );
     }
  }
  return withRouter(DefaultHeaders);
}

