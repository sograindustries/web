import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { AppState, AppDispatch } from "../store";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import { withApi, WithApiProps } from "../api/hoc";
import { loginSuccess } from "../store/session/actions";
import MainPage from "./MainPage";
import PatchesPage from "./PatchesPage";
import AppBar from "./AppBar";
import PatientsPage from "./PatientsPage";
import PatchSummaryPage from "./PatchSummaryPage";

const withPath = (route: string) => `/${route}`;

export const ROUTE_HOME = "";
export const ROUTE_SIGNUP = "signup";
export const ROUTE_PATIENTS = "patients";
export const ROUTE_PATCHES = "patches";
export const ROUTE_LOGIN = "login";
export const ROUTE_PATCH_SUMMARY = "patches/:id";

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path={withPath(ROUTE_SIGNUP)}>
          <SignupPage />
        </Route>
        <Route path={withPath(ROUTE_LOGIN)}>
          <LoginPage />
        </Route>
        <PrivateRoute
          path={withPath(ROUTE_PATCH_SUMMARY)}
          component={PatchSummaryPage}
        />

        <PrivateRoute path={withPath(ROUTE_PATCHES)}>
          <PatchesPage />
        </PrivateRoute>
        <PrivateRoute path={withPath(ROUTE_PATIENTS)}>
          <PatientsPage />
        </PrivateRoute>
        <PrivateRoute path={withPath(ROUTE_HOME)}>
          <MainPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRouteHelper({
  children,
  isAuthenticated,
  attemptAuthFromStorage,
  ...rest
}: any) {
  const [hasAttemptedAuth, setHasAttemptedAuth] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      attemptAuthFromStorage().finally(() => {
        setHasAttemptedAuth(true);
      });
    }
  }, [isAuthenticated, attemptAuthFromStorage]);

  if (!hasAttemptedAuth && !isAuthenticated) {
    return <div>Loading....</div>;
  }

  return (
    <AppBar>
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    </AppBar>
  );
}

const PrivateRoute = withApi(
  connect(
    (state: AppState) => {
      return {
        isAuthenticated: state.session.isAuthenticated
      };
    },
    (dispatch: AppDispatch, ownProps: WithApiProps) => {
      return {
        attemptAuthFromStorage: async () => {
          /*
          if (process.env.NODE_ENV !== "production") {
            dispatch(loginSuccess("will@argosindustries.com", ));
            return;
          }
          */

          const user = await ownProps.api.auth.getCurrentUser();
          if (user) {
            dispatch(loginSuccess(user.username, user.jwt));
          }
        }
      };
    }
  )(PrivateRouteHelper)
);
