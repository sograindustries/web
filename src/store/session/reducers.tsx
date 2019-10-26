import { combineReducers } from "redux";
import { SessionAction } from "./actions";

function jwt(state: string | null = null, action: SessionAction) {
  switch (action.type) {
    case "ACTION_LOGIN_SUCCESS":
      return action.payload.jwt;
    case "ACTION_LOGIN_START":
      return null;
    case "ACTION_LOGIN_FAILED":
      return null;
    default:
      return state;
  }
}

function isAuthenticated(state: boolean = false, action: SessionAction) {
  switch (action.type) {
    case "ACTION_LOGIN_FAILED":
    case "ACTION_LOGOUT_SUCCESS":
      return false;
    case "ACTION_LOGIN_SUCCESS":
      return true;
    default:
      return state;
  }
}

export const reducer = combineReducers({
  isAuthenticated,
  jwt
});
