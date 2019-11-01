import * as React from "react";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import gql from "graphql-tag";
import { PatchPartsFragment } from "../generated/graphql";
import BatteryChart from "./BatteryChart";
import PatchCardStatsOverview from "./PatchCardStatsOverview";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    overflow: "auto",
    flexDirection: "row"
  },
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  paper: {
    display: "flex",
    overflow: "auto",
    flexDirection: "row"
  },
  fixedHeight: {
    height: 240
  },
  depositContext: {
    flex: 1
  }
}));

function Title(props: { children: any }) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

function PatchListItem(props: PatchPartsFragment) {
  const classes = useStyles({});

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid item={true} xs={12} md={6} lg={6}>
      <Paper className={fixedHeightPaper} style={{ position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Title>Andy</Title>
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.depositContext}
          >
            <div>{props.mobileDevice}</div>
            <div>{props.uuid}</div>
            <div>FW: {props.firmwareVersion}</div>
            <div>APP: {props.appVersion}</div>
          </Typography>

          <BatteryChart {...props} />
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            flex: 1
          }}
        >
          <PatchCardStatsOverview {...props} />
        </div>
      </Paper>
    </Grid>
  );
}

PatchListItem.fragments = {
  patch: gql`
    fragment PatchParts on Patch {
      id
      uuid
      mobileDevice
      firmwareVersion
      appVersion
      ...BatteryActivityParts
      ...PatchCardStatsOverview
    }

    ${BatteryChart.fragments.batteryActivity}
    ${PatchCardStatsOverview.fragments.stats}
  `
};

export default PatchListItem;
