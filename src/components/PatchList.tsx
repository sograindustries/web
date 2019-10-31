import * as React from "react";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useGetPatchesQuery, PatchPartsFragment } from "../generated/graphql";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
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
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
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

const GET_PATCH_FRAGMENT = gql`
  fragment PatchParts on Patch {
    id
    uuid
  }
`;

const GET_PATCHES_QUERY = gql`
  query GetPatches {
    viewer {
      patches {
        ...PatchParts
      }
    }
  }

  ${GET_PATCH_FRAGMENT}
`;

function PatchListItem(props: PatchPartsFragment) {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid item={true} xs={12} md={4} lg={4}>
      <Paper className={fixedHeightPaper}>
        <Title>Andy</Title>
        <Typography component="p" variant="h4">
          $3,024.00
        </Typography>
        <Typography color="textSecondary" className={classes.depositContext}>
          {props.uuid}
        </Typography>
      </Paper>
    </Grid>
  );
}

function PatchList() {
  const { data } = useGetPatchesQuery();
  const classes = useStyles();

  if (!data || !data.viewer) {
    return <div>hahaha..loading</div>;
  }

  return (
    <Grid container={true} spacing={3} className={classes.container}>
      {data.viewer.patches.map(patch => {
        return <PatchListItem {...patch} />;
      })}
    </Grid>
  );
}

export default PatchList;
