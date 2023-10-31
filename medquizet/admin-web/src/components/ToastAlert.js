import React, { useEffect } from "react";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert from "@mui/material/Alert";

const ToastAlert = ({ openToast, setOpenToast, message, severity }) => {
  useEffect(() => {
    setTimeout(() => {
      if (openToast) {
        setOpenToast();
      }
    }, 3000);
  }, [setOpenToast, openToast]);

  const handleClose = () => {
    setOpenToast(false);
  };
  const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <Snackbar
        severity={severity === "failed" ? "failed" : "success"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openToast}
        onClose={handleClose}
        key={`top right`}
      >
        <Alert
          onClose={handleClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToastAlert;
