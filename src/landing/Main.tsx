import * as React from "react";
import Copyright from "./Copyright";
import {
  CssBaseline,
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Hidden,
  CardMedia,
  CardActionArea,
  Card,
  CardContent,
  Fab,
  makeStyles
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { NAME_HEALTH_UPPER_CASE } from "../constants";
import CallToActionForVC from "./CallToActionForVC";

function Header() {
  return <div>Header</div>;
}

function Body() {
  return <div>body</div>;
}

function Footer() {
  return <div>Footer</div>;
}

function Main() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container className={classes.container}>
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: "none" }}
                src="https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=blue-and-purple-cosmic-sky-956999.jpg&fm=jpg"
                alt="background"
              />
            }
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <img src="logo.png" width="52px" />
                    <Typography
                      variant="h6"
                      color="inherit"
                      style={{ fontWeight: "lighter", fontSize: 28 }}
                    >
                      {NAME_HEALTH_UPPER_CASE}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",

                      alignItems: "flex-end",
                      height: 150,
                      marginTop: 80
                    }}
                  >
                    <Typography
                      variant="h2"
                      color="inherit"
                      className={classes.mainText}
                      gutterBottom={true}
                    >
                      Never Miss a Beat.
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>

          <CallToActionForVC />
        </main>
      </Container>
      <Copyright />
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage:
      "url(https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=blue-and-purple-cosmic-sky-956999.jpg&fm=jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    },
    height: 500
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  },
  mainText: {
    fontWeight: "bold"
  }
}));

export default Main;
