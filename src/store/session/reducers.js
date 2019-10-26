"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
function jwt(state, action) {
    if (state === void 0) { state = null; }
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
function isAuthenticated(state, action) {
    if (state === void 0) { state = false; }
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
exports.reducer = redux_1.combineReducers({
    isAuthenticated: isAuthenticated,
    jwt: jwt
});
