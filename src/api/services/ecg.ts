import AWS from "aws-sdk";

const poolData = {
  UserPoolId: "us-east-1_9vsr32SCz", // your user pool id here
  ClientId: "1hojv8fbr0nkft2p2tbvgksi46" // your app client id here
};

export const makeEcgService = () => {
  return {
    list: (jwt: string) => {
      return new Promise<{ key: string; size: number }[]>(async (res, rej) => {
        await AWS.config.update({
          ...AWS.config,
          region: "us-east-1",
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be",
            Logins: {
              [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: jwt
            }
          })
        });

        const s3 = new AWS.S3({
          apiVersion: "2006-03-01"
        });

        s3.listObjects(
          { Bucket: "argos-ecgs", MaxKeys: 100 },
          (error, data) => {
            if (error) {
              console.error("ERROR: ", error);
              rej(error);
            }

            if (data && data.Contents) {
              res(
                data.Contents.map(bucket => ({
                  key: bucket.Key || "n/a",
                  size: bucket.Size || 0
                }))
              );
            }

            rej(new Error("Something wen't wrong uploading data to bucket."));
          }
        );
      });
    },
    get: (key: string, jwt: string) => {
      return new Promise(async (res, rej) => {
        await AWS.config.update({
          ...AWS.config,
          region: "us-east-1",
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "us-east-1:c6c201f9-b3f3-4c26-bf71-298384afd0be",
            Logins: {
              [`cognito-idp.us-east-1.amazonaws.com/${poolData.UserPoolId}`]: jwt
            }
          })
        });

        const s3 = new AWS.S3({
          apiVersion: "2006-03-01"
        });

        s3.getObject({ Bucket: "argos-ecgs", Key: key }, (error, data) => {
          if (error) {
            console.error("ERROR: ", error);
            rej(error);
          }

          if (data && data.Body) {
            res(JSON.parse(data.Body.toString("utf-8")));
          }

          rej(new Error("Something wen't wrong uploading data to bucket."));
        });
      });
    }
  };
};
