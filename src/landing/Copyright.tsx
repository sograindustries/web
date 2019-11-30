import * as React from "react";
import { Typography, Link } from "@material-ui/core";
import { WEBSITE_HTTPS_LINK, NAME_UPPER_CASE } from "../constants";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={WEBSITE_HTTPS_LINK}>
        {NAME_UPPER_CASE}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
