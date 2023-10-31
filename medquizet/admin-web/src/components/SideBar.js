import React from "react";
import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";

import DrawerComponent from "./Drawer";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    [theme.breakpoints.down("md")]: {
      width: drawerWidth / 3,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down("md")]: {
      width: drawerWidth / 3,
    },
  },
  drawerItem: {
    [theme.breakpoints.down("md")]: {
      "& .MuiListItemIcon-root": {
        minWidth: "unset",
        marginRight: theme.spacing(1),
      },
      "& .MuiListItemText-root": {
        display: "none",
      },
    },
  },
}));

function Sidebar({ selectedComponent, setSelectedComponent }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="sidebar">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <DrawerComponent
            setSelectedComponent={setSelectedComponent}
            selectedComponent={selectedComponent}
          />
        </Drawer>
      </nav>
    </div>
  );
}

export default Sidebar;
