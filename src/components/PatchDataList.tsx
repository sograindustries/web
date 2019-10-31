import * as React from "react";
import AWS from "aws-sdk";
import { connect } from "react-redux";
import { AppState } from "../store";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

var poolData = {
  UserPoolId: "us-east-1_9vsr32SCz", // your user pool id here
  ClientId: "1hojv8fbr0nkft2p2tbvgksi46" // your app client id here
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    }
  })
);

const makeEcgService = () => {
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

const service = makeEcgService();

interface Props {
  jwt: string | null;
}
function PatchDataList(props: Props) {
  const classes = useStyles();
  const [lastUpdated, setLastUpdated] = React.useState(new Date());
  const [ecgData, setEcgData] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState();

  const download = () => {
    var textToSave = JSON.stringify(ecgData);
    textToSave = textToSave.slice(1, textToSave.length - 1);

    var hiddenElement = document.createElement("a");

    hiddenElement.href = "data:attachment/text," + encodeURI(textToSave);
    hiddenElement.target = "_blank";
    hiddenElement.download = "myFile.txt";
    hiddenElement.click();
  };

  React.useEffect(() => {
    const jwt = props.jwt;
    if (jwt) {
      setIsLoading(true);
      service.list(jwt).then(async res => {
        const keys = res
          .map(obj => obj.key)
          .reverse()
          .splice(0, 10);
        const objects = await Promise.all(
          keys.map(key => {
            return service.get(key, jwt);
          })
        );

        setEcgData(objects.flat());
        setIsLoading(false);
      });
    }

    setLastUpdated(new Date());

    setInterval(() => {
      const jwt = props.jwt;
      if (jwt) {
        setIsLoading(true);
        service.list(jwt).then(async res => {
          const keys = res
            .map(obj => obj.key)
            .reverse()
            .splice(0, 10);
          const objects = await Promise.all(
            keys.map(key => {
              return service.get(key, jwt);
            })
          );

          setEcgData(objects.flat());
          setIsLoading(false);
        });
      }

      setLastUpdated(new Date());
    }, 10000);
  }, []);

  /*
  React.useEffect(() => {
    const jwt = props.jwt;
    if (jwt) {
      service.list(jwt).then(async res => {
        const objects = await Promise.all(
          res.map(obj => {
            return service.get(obj.key, jwt);
          })
        );

        console.log(objects);
      });
    }
  }, [props.jwt]);
  */

  return (
    <div>
      <div>Last updated: {lastUpdated.toISOString()}</div>
      {!isLoading && <button onClick={download}>Download</button>}
      <div>
        {isLoading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          "Samples: " + JSON.stringify(ecgData.length)
        )}
      </div>
    </div>
  );
}

export default connect((state: AppState) => {
  return {
    jwt: state.session.jwt
  };
})(PatchDataList);
