
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, from } from '@apollo/client';
import { authMiddleware, errorLink, splitLink, typeNameParseMiddleware } from './apollo/linkMiddlewares.ts';
//This must be on .env file

const client = new ApolloClient({
    link: from([ authMiddleware, errorLink, typeNameParseMiddleware, splitLink ]),
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
