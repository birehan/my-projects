import React from "react";
import {
  List,
  Typography,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

import { logOutUser } from "../features/authentication/actions/users.js";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  Book,
  Layers,
  QuestionAnswer,
  Group,
  ExitToApp,
} from "@mui/icons-material";
import LogoImg from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  nameSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "40px 20px 30px",
    backgroundColor: "rgba(145, 158, 171, 0.12)",
    padding: { xs: "0", md: "5px" },
    borderRadius: "5px",
  },
  logoSection: {
    margin: "20px 0 10px 20px",
  },
  logoImage: {
    width: "40px",
    height: "40px",
  },
}));
const DrawerMenuItem = ({ icon, primaryText, onClick, selectedComponent }) => {
  const isDesktopSize = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSelected = selectedComponent
    .toLowerCase()
    .includes(primaryText.toLowerCase().slice(0, -1));

  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        background: isSelected ? "#039198" : "",
        "&:hover": {
          background: isSelected ? "#039198" : "",
          opacity: isSelected ? "0.9" : "1",
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      {isDesktopSize && <ListItemText primary={primaryText} />}
    </ListItem>
  );
};

const DrawerComponent = ({ selectedComponent, setSelectedComponent }) => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const classes = useStyles();
  const isDesktopSize = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  const handleSelected = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div>
      <div className={classes.toolbar}>
        <Box className={classes.logoSection}>
          <img src={LogoImg} alt="Logo" className={classes.logoImage} />
        </Box>

        {isDesktopSize ? (
          <Box className={classes.nameSection}>
            <Typography variant="h6" noWrap>
              {currentUser?.name}
            </Typography>
          </Box>
        ) : (
          <Box className={classes.nameSection}>
            <Avatar> {currentUser?.name?.charAt(0)?.toUpperCase()}</Avatar>
          </Box>
        )}
      </div>

      <Divider />

      <List>
        <DrawerMenuItem
          icon={<Book />}
          primaryText="Courses"
          onClick={() => handleSelected("courses")}
          selectedComponent={selectedComponent}
        />
        <DrawerMenuItem
          icon={<Layers />}
          primaryText="Units"
          onClick={() => handleSelected("units")}
          selectedComponent={selectedComponent}
        />
        <DrawerMenuItem
          icon={<QuestionAnswer />}
          primaryText="Questions"
          onClick={() => handleSelected("questions")}
          selectedComponent={selectedComponent}
        />

        <Divider />

        {currentUser && currentUser.role === "super_admin" && (
          <DrawerMenuItem
            icon={<Group />}
            primaryText="Users"
            onClick={() => handleSelected("users")}
            selectedComponent={selectedComponent}
          />
        )}

        <DrawerMenuItem
          icon={<SettingsIcon />}
          primaryText="Profile"
          onClick={() => handleSelected("profile")}
          selectedComponent={selectedComponent}
        />

        <DrawerMenuItem
          icon={<ExitToApp />}
          primaryText="Logout"
          onClick={handleLogout}
          selectedComponent={selectedComponent}
        />

        <Divider />
      </List>
    </div>
  );
};

export default DrawerComponent;
