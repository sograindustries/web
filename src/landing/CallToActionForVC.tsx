import * as React from "react";
import {
  Container,
  Typography,
  makeStyles,
  Fab,
  TextField
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Deck from "./Deck";
import { getFirebase } from "./firebase";

function CallToActionForVC() {
  const classes = useStyles();

  const [showDeck, setShowDeck] = React.useState(false);
  const [code, setCode] = React.useState("");

  const handleViewDeckClick = () => {
    getFirebase()
      .analytics()
      .logEvent("view_deck_btn_click", {
        code
      });
    setShowDeck(true);
  };

  if (showDeck && code.length > 0) {
    return <Deck uuid={code} />;
  }

  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Learn More
      </Typography>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15
        }}
      >
        <TextField
          style={{ marginBottom: 30 }}
          id="outlined-basic"
          label="Enter Code"
          variant="outlined"
          onChange={e => {
            setCode(e.target.value);
          }}
        />

        <Fab
          variant="extended"
          aria-label="like"
          color="secondary"
          disabled={code.length == 0}
          onClick={handleViewDeckClick}
        >
          <FavoriteIcon className={classes.extendedIcon} />
          View Pitch Deck
        </Fab>
      </div>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(0, 0, 6)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default CallToActionForVC;
