import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
export declare const makeAuthService: () => {
    login: (username: string, password: string) => Promise<string>;
    signup: (username: string, password: string) => Promise<AmazonCognitoIdentity.CognitoUser>;
    getCurrentUser: () => Promise<{
        username: string;
        jwt: string;
    } | null>;
    signOut: () => Promise<unknown>;
};
