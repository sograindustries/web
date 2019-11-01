import * as React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import gql from "graphql-tag";
import { useGetPatchesQuery } from "../generated/graphql";
import PatchListItem from "./PatchListItem";

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

const GET_PATCHES_QUERY = gql`
  query GetPatches {
    viewer {
      patches {
        id
        ...PatchParts
      }
    }
  }

  ${PatchListItem.fragments.patch}
`;

function PatchList() {
  const { data } = useGetPatchesQuery();
  const classes = useStyles();

  if (!data || !data.viewer) {
    return <div>hahaha..loading</div>;
  }

  return (
    <Grid container={true} spacing={3} className={classes.container}>
      {data.viewer.patches.map(patch => {
        return <PatchListItem key={patch.id} {...patch} />;
      })}
    </Grid>
  );
}

export default PatchList;
