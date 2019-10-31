import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect, MapDispatchToPropsParam } from "react-redux";
import { login, signup } from "../store/session/actions";
import { withRouter, RouteComponentProps } from "react-router";
import { AppDispatch } from "../store";
import { WithApiProps, withApi } from "../api/hoc";

type SignupErrorMessage = string;

interface Props {
  onSubmitClick: (
    username: string,
    password: string
  ) => Promise<SignupErrorMessage[]>;
}

function SignupPage(props: Props) {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="repeat-password"
          label="Repeat Password"
          type="password"
          id="repeat-password"
          onChange={e => {
            setRepeatPassword(e.target.value);
          }}
        />

        {errorMessage && <h4 className={classes.errorText}>{errorMessage}</h4>}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={async () => {
            const errors = await props.onSubmitClick(username, password);
            if (errors.length > 0) {
              setErrorMessage(errors.join(", "));
            }
          }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const mapDispatchToProps: MapDispatchToPropsParam<
  Props,
  RouteComponentProps & WithApiProps
> = (dispatch: AppDispatch, ownProps) => {
  return {
    onSubmitClick: async (username: string, password: string) => {
      try {
        const response = await dispatch(
          signup(username, password, ownProps.api)
        );

        console.log(response);

        const loginResponse = await dispatch(
          login(username, password, ownProps.api)
        );

        ownProps.history.push("protected");
        return []; // no errors
      } catch (error) {
        console.log(error);
        return [error.message as SignupErrorMessage];
      }
    }
  };
};

export default withRouter(
  withApi(
    connect(
      undefined,
      mapDispatchToProps
    )(SignupPage)
  )
);

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorText: {
    color: "red"
  }
}));
