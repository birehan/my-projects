import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SpinnerComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // set the height to fill the viewport
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // set a semi-transparent background
        zIndex: 9999, // set the z-index higher than the page content
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SpinnerComponent;
