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
              <title>{overrides.title || "Tooltip"}</title>
              <meta name="description" content={overrides.description || "tooltip"} />
              <meta name="theme-color" content="#000000" />
              <meta property="og:title" content="Tooltip" />
              <meta property="og:url" content="https://tooltip.sh" />
              <meta property="og:type" content="website" />
              <meta property="og:description" content="tooltip" />
              {/* <meta property="og:image" content="" /> */}
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              {/* <link rel="canonical" href={} /> */}
              <meta charSet="utf-8" />
            </Head>
            <OriginalReactComponent {...this.props} />
          </div>
        );
     }
  }
  return withRouter(DefaultHeaders);
}

