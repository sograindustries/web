import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
);

export default function AddNewPatientButton() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon className={classes.extendedIcon} />}
      >
        New Patient
      </Button>
    </div>
  );
}
