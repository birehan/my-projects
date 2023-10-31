import React from "react";
import { Container, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "2rem",
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  loginLink: {
    fontSize: "1.2rem",
    textAlign: "center",
    "& > a": {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
  },
}));

const NotFound404Page = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Sorry, page not found!
      </Typography>
      <Typography variant="body1" className={classes.message}>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </Typography>
      <Typography variant="body1" className={classes.loginLink}>
        <Link href="/">Go To Home</Link>
      </Typography>
    </Container>
  );
};

export default NotFound404Page;
