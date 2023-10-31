import React, { useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm.js";
import Logo from "../../../assets/logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const styles = {
  container: {
    height: "100vh",
    position: "relative",
    width: { xs: "100%", md: "600px" },
    margin: "auto",
  },
  contentContainer: {
    flex: "55",
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    gap: "20px",
    boxShadow: "0px 0px 50px -25px rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  contentInnerBox: {
    padding: "50px",
    gap: "20px",
  },
  logoImage: {
    width: "50px",
    height: "50px",
    "&:hover": {
      cursor: "pointer",
    },
    margin: "auto",
  },
  appTitle: {
    fontSize: "20px",
    color: "#078989",
    textAlign: "center",
  },
  pageTitle: {
    fontFamily: "Montserrat",
    fontWeight: 600,
    lineHeight: "59px",
    color: "#000000",
    textAlign: "center",
    fontSize: { xs: "36px", md: "40px", lg: "40px" },
  },
};

const LoginPage = () => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.contentContainer}>
        <Stack sx={styles.contentBox}>
          <Stack sx={styles.contentInnerBox}>
            <Box component="img" alt="logo" src={Logo} sx={styles.logoImage} />
            <Typography sx={styles.appTitle}>Medical Question Bank</Typography>
            <Typography sx={styles.pageTitle}>Login</Typography>
            <LoginForm />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
