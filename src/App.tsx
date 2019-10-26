import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./store";
import thunk from "redux-thunk";
import { AppRouter } from "./components/AppRouter";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

const client = new ApolloClient({
  uri:
    //"https://9sqzy2t6ji.execute-api.us-east-1.amazonaws.com/production/graphql"
    "http://localhost:3000/graphql"
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ApolloProvider>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: any) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
