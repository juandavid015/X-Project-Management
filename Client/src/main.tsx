
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, from,} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
//This must be on .env file

const errorLink = onError(({ graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `${token}` : "",
    },
  });
  return forward(operation);
});
const typenameParseMiddleware = new ApolloLink((operation, forward) => {
  // idea taked from https://github.com/apollographql/apollo-client/issues/1913
  if (operation.variables) {
    const removeTypenameFromVariables = (variables: Record<string, string>) => {
      return JSON.parse(JSON.stringify(variables), (key, value) => {
        return key === '__typename' ? undefined : value;
      });
    };
    // eslint-disable-next-line no-param-reassign
    operation.variables = removeTypenameFromVariables(operation.variables);
  }
  return forward(operation);
});
const client = new ApolloClient({
  link: from([ authMiddleware, errorLink, typenameParseMiddleware, httpLink ]),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </React.StrictMode>,
)
