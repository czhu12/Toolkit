import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
const { NEXT_PUBLIC_BACKEND_URL } = process.env;

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const httpLink = createHttpLink({
  uri: NEXT_PUBLIC_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  } else {
    return { headers };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: NEXT_PUBLIC_BACKEND_URL,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

export default client;
