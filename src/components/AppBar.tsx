import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Drawer from "@material-ui/core/Drawer";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import MemoryIcon from "@material-ui/icons/Memory";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { logout } from "../store/session/actions";
import { WithApiProps, withApi } from "../api/hoc";
import { AppDispatch } from "../store";
import { MenuItem, Menu } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router";
import { ROUTE_PATCHES, ROUTE_HOME, ROUTE_PATIENTS } from "./AppRouter";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: 36
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap"
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    title: {
      flexGrow: 1
    }
  })
);

interface Props {
  onLogoutClick: () => void;
  onHomeMenuClick: () => void;
  onPatientsMenuClick: () => void;
  onPatchesMenuClick: () => void;
  children?: any;
}

function AppBar({
  onLogoutClick,
  onHomeMenuClick,
  onPatientsMenuClick,
  onPatchesMenuClick,

  children
}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accMenuOpen = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MaterialAppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ARGOS
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={accMenuOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </MaterialAppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={"home"} onClick={onHomeMenuClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button key={"patient_list"} onClick={onPatientsMenuClick}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary={"Patients"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={"patches"} onClick={onPatchesMenuClick}>
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Patches"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default withRouter(
  withApi(
    connect(
      undefined,
      (
        dispatch: AppDispatch,
        { api, history }: WithApiProps & RouteComponentProps
      ) => {
        return {
          onLogoutClick: async () => {
            dispatch(logout(api));
          },
          onPatientsMenuClick: () => {
            history.push(ROUTE_PATIENTS);
          },
          onPatchesMenuClick: () => {
            history.push(ROUTE_PATCHES);
          },
          onHomeMenuClick: () => {
            history.push(ROUTE_HOME);
          }
        };
      }
    )(AppBar)
  )
);
