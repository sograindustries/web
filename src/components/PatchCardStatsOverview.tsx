import * as React from "react";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core";
import { PatchCardStatsOverviewFragment } from "../generated/graphql";
import { ShowChart, Favorite, ThumbUp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "rgba(63, 81, 181, 0.1)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 140
  }
}));

function PatchCardStatsOverview(props: PatchCardStatsOverviewFragment) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <ThumbUp /> Normal Rhythm
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Favorite /> 56 BPM
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <ShowChart /> {JSON.stringify(props.readingCount)} readings
      </div>
    </div>
  );
}

PatchCardStatsOverview.fragments = {
  stats: gql`
    fragment PatchCardStatsOverview on Patch {
      readingCount
    }
  `
};

export default PatchCardStatsOverview;
