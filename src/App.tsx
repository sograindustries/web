import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";
import thunk from "redux-thunk";
import { AppRouter } from "./components/AppRouter";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

const customFetch = (uri: string, options: any) => {
  options.headers.Authorization = store.getState().session.jwt;
  return fetch(uri, options);
};

const link = createHttpLink({
  fetch: customFetch,
  uri: "http://localhost:4000"
  // "https://9sqzy2t6ji.execute-api.us-east-1.amazonaws.com/production/graphql"
});

const client = new ApolloClient({ link, cache: new InMemoryCache() });

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  );
}
