import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Toolkit from "../lib/core/views";

import '../styles/bulma.scss'
import '../styles/globals.scss'
import '../styles/core.scss'
import 'highlight.js/styles/github.css';

if (typeof window !== "undefined") {
  window.__kit_run = (code) => {
    Toolkit.run(code);
  }
}


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
