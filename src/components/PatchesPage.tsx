import * as React from "react";
import PatchGrid from "./PatchGrid";
import { connect } from "react-redux";
import { AppState } from "../store";

function PatchesPage(props: { jwt: string | null }) {
  const [patches, setPatches] = React.useState<
    {
      name: string;
      uuid: string;
      batteryPct: number;
      lastUploadEpoch: number;
      sampleCount: number;
    }[]
  >([]);

  React.useEffect(() => {
    if (props.jwt) {
      fetch(
        "https://5r2zhe6294.execute-api.us-east-1.amazonaws.com/production/patches",
        {
          //  mode: "no-cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: props.jwt
            //   "Access-Control-Allow-Origin": "*"
          }
        }
      )
        .then(res => res.json())
        .then(setPatches);
    }
  }, []);

  return (
    <div>
      <PatchGrid patchList={patches} />
    </div>
  );
}

export default connect((state: AppState) => {
  return {
    jwt: state.session.jwt
  };
})(PatchesPage);
