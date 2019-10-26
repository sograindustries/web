import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import moment from "moment";
import BatteryIcon from "@material-ui/icons/BatteryFull";

interface Patch {
  name: string;
  uuid: string;
  batteryPct: number;
  lastUploadEpoch: number;
  sampleCount: number;
}

interface Props {
  patchList: Patch[];
}

function PatchGrid(props: Props) {
  const classes = useStyles({});

  function FormRow({ items }: { items: Patch[] }) {
    return (
      <React.Fragment>
        {items.map(item => {
          return (
            <Grid item xs={4} key={item.uuid}>
              <Paper className={classes.paper}>
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    style={{ flexGrow: 1 }}
                  >
                    {item.name}
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <BatteryIcon
                      style={{ color: item.batteryPct > 0.2 ? "green" : "red" }}
                    />
                    <Typography>
                      {(item.batteryPct * 100).toFixed(0)}%
                    </Typography>
                  </div>
                </div>

                <Typography variant="subtitle1" style={{ color: "gray" }}>
                  {item.uuid}
                </Typography>

                <Typography>
                  {"Sample Count: " + (item.sampleCount || 0)}
                </Typography>

                <Typography>
                  {"Last uploaded " +
                    moment.unix(item.lastUploadEpoch).fromNow()}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  const rows = [];

  const list = [...props.patchList];
  for (let i = 0; i < list.length; i += 3) {
    rows.push(list.slice(i, Math.min(list.length, i + 3)));
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {rows.map(row => {
          return (
            <Grid
              container
              item
              xs={12}
              spacing={3}
              key={row.map(uuid => uuid).join("-")}
            >
              <FormRow items={row} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(1),
      color: theme.palette.text.primary
    }
  })
);

export default PatchGrid;
