import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import BrowserScript from "../lib/core/views";

import '../styles/bulma.scss'
import '../styles/globals.scss'
import '../styles/core.scss'
import 'highlight.js/styles/github.css';

if (typeof window !== "undefined") {
  window.__bs_run = (code) => {
    // remove all imports from the code and add it to the 
    BrowserScript.run(code);
    /*
    const bs = new BrowserScript(document.getElementById('main-view'));
    bs.start(async function() {
      const runnable = `async (bs) => {${code}}`
      return eval(runnable)(bs);
    });
    */
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
