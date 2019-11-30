import * as React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";

interface Props {
  uuid: string;
}

function Deck(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <iframe
        src={`https://9sqzy2t6ji.execute-api.us-east-1.amazonaws.com/production/deck?uuid=${props.uuid}`}
        frameBorder="0"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}));

export default Deck;
