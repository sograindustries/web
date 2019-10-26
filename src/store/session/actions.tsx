import { action } from "typesafe-actions";
import { AppThunk } from "..";
import { Api } from "../../api";
import { CognitoUser } from "amazon-cognito-identity-js";

export function loginStart() {
  return action("ACTION_LOGIN_START");
}

export function loginSuccess(username: string, jwt: string) {
  return action("ACTION_LOGIN_SUCCESS", { username, jwt });
}

export function loginFailed(error: string) {
  return action("ACTION_LOGIN_FAILED", error);
}

export function logoutSuccess() {
  return action("ACTION_LOGOUT_SUCCESS");
}

export function login(
  username: string,
  password: string,
  api: Api
): AppThunk<Promise<string>, SessionAction> {
  return async dispatch => {
    try {
      const response = await api.auth.login(username, password);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export function logout(api: Api): AppThunk<void, SessionAction> {
  return async dispatch => {
    try {
      await api.auth.signOut();
      dispatch(logoutSuccess());
    } catch (error) {
      console.error("Signout error: ", error);
      throw error;
    }
  };
}

export function signup(
  username: string,
  password: string,
  api: Api
): AppThunk<Promise<CognitoUser>, SessionAction> {
  return async dispatch => {
    try {
      const response = await api.auth.signup(username, password);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export type SessionAction = ReturnType<
  | typeof loginStart
  | typeof loginSuccess
  | typeof loginFailed
  | typeof logoutSuccess
>;
