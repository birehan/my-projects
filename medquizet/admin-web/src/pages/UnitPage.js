import React from "react";
import { Card, Container } from "@mui/material";
import UnitContent from "../features/units/components/UnitContent.js";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const UnitPage = ({unit}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.mainContainer}>
      <Card
        sx={{
          overflow: "auto",
          margin: "auto",
          background:
            "linear-gradient( 108.74deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100% )",
          boxShadow: "0px 0px 50px -25px rgb(0 0 0 / 50%)",
          padding: "30px",
        }}
      >
        <UnitContent unit={unit} />
      </Card>
    </Container>
  );
};

export default UnitPage;
