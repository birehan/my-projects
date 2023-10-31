import * as React from "react";

import { Box, Menu, Typography } from "@mui/material";

import UnitFilter from "./UnitFilter.js";
const UnitFilterDropDown = ({ units, setfilterUnit, filterUnit }) => {
  const [anchorUpload, setAnchorUpload] = React.useState(null);

  const openUpload = Boolean(anchorUpload);

  const handleUploadClick = (event) => {
    setAnchorUpload(event.currentTarget);
  };
  const handleUploadClose = () => {
    setAnchorUpload(null);
  };
  return (
    <React.Fragment>
      <Typography
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          color: "#039198",
          fontSize: "1.2rem",
        }}
        onClick={handleUploadClick}
      >
        {" "}
        Unit
      </Typography>

      <Menu
        anchorEl={anchorUpload}
        id="account-menu"
        open={openUpload}
        onClose={handleUploadClose}
        onClick={handleUploadClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
          fontFamily: "poppins",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box
          sx={{
            width: { xs: "300px", sm: "320px", md: "350px" },
            padding: "20px",
          }}
        >
          <UnitFilter
            units={units}
            setfilterUnit={setfilterUnit}
            filterUnit={filterUnit}
          />
        </Box>
      </Menu>
    </React.Fragment>
  );
};

export default UnitFilterDropDown;
