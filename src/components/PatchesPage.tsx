import * as React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import PatchList from "./PatchList";

interface Props {}

function PatchesPage(props: Props) {
  return (
    <Container>
      <PatchList />
    </Container>
  );
}

export default PatchesPage;
