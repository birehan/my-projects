import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import UsersTable from "./UsersTable";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const UsersComponent = ({ setSelectedComponent }) => {
  const { users, userCount } = useSelector((state) => state.users);

  const theme = useTheme();

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
      <Box flexGrow={1} bgcolor="background.default" p={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Box
            mr={2}
            sx={{
              backgroundColor: "rgba(145, 158, 171, 0.12)",
              padding: "10px",
            }}
          >
            <Typography sx={{ fontSize: "1.3rem" }}>
              Total users {userCount}
            </Typography>
          </Box>
          <Button
            onClick={() => setSelectedComponent("user/create")}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Admin
          </Button>
        </Box>
        <UsersTable setSelectedComponent={setSelectedComponent} users={users} />
        <style>
          {`@media (max-width: ${theme.breakpoints.values.md}px) {
            .MuiGrid-item {
              flex-basis: calc(100% - 80px);
              max-width: calc(100% - 80px);
            }
          }`}
        </style>
      </Box>
    </Container>
  );
};
export default UsersComponent;
