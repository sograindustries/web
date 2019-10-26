import { AppThunk } from "..";
import { Api } from "../../api";
import { CognitoUser } from "amazon-cognito-identity-js";
export declare function loginStart(): {
    type: "ACTION_LOGIN_START";
};
export declare function loginSuccess(username: string, jwt: string): {
    type: "ACTION_LOGIN_SUCCESS";
    payload: {
        username: string;
        jwt: string;
    };
};
export declare function loginFailed(error: string): {
    type: "ACTION_LOGIN_FAILED";
    payload: string;
};
export declare function logoutSuccess(): {
    type: "ACTION_LOGOUT_SUCCESS";
};
export declare function login(username: string, password: string, api: Api): AppThunk<Promise<string>, SessionAction>;
export declare function logout(api: Api): AppThunk<void, SessionAction>;
export declare function signup(username: string, password: string, api: Api): AppThunk<Promise<CognitoUser>, SessionAction>;
export declare type SessionAction = ReturnType<typeof loginStart | typeof loginSuccess | typeof loginFailed | typeof logoutSuccess>;
