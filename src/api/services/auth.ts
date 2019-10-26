import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

var poolData = {
  UserPoolId: "us-east-1_9vsr32SCz", // your user pool id here
  ClientId: "1hojv8fbr0nkft2p2tbvgksi46" // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

export const makeAuthService = () => {
  return {
    login: async (username: string, password: string) => {
      return new Promise<string>((res, rej) => {
        var authenticationData = {
          Username: username,
          Password: password
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
          authenticationData
        );

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
          Username: username,
          Pool: userPool
        });

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            res(result.getIdToken().getJwtToken());
          },

          onFailure: function(err) {
            rej(err);
          }
        });
      });
    },
    signup: async (username: string, password: string) => {
      return new Promise<AmazonCognitoIdentity.CognitoUser>((res, rej) => {
        userPool.signUp(
          username,
          password,
          [
            new AmazonCognitoIdentity.CognitoUserAttribute({
              Name: "email",
              Value: username
            })
          ],
          [],
          function(err, result) {
            if (err) {
              rej(err);
              return;
            }

            if (!result) {
              rej(new Error("No result available."));
              return;
            }

            res(result.user);
          }
        );
      });
    },

    getCurrentUser: () => {
      return new Promise<{ username: string; jwt: string } | null>(
        (res, rej) => {
          var cognitoUser = userPool.getCurrentUser();

          if (!cognitoUser) {
            res(null);
            return;
          }

          cognitoUser.getSession((err: any, session: any) => {
            if (err) {
              rej(err);
              return;
            }

            console.log("session validity: " + session.isValid());
            console.log("SESSION: ", session);
            const accessToken = session.getIdToken();
            res({
              jwt: accessToken.getJwtToken(),
              username: accessToken["payload"]["username"]
            });

            /*
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: "...", // your identity pool id here
              Logins: {
                // Change the key below according to the specific region your user pool is in.
                [`cognito-idp.us-east-2.amazonaws.com/${poolData.UserPoolId}`]: session
                  .getIdToken()
                  .getJwtToken()
              }
            });
            */

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
          });
        }
      );
    },

    signOut: () => {
      return new Promise((res, rej) => {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
          cognitoUser.signOut();
          res();
        } else {
          rej(new Error("User is not available."));
        }
      });
    }
  };
};
