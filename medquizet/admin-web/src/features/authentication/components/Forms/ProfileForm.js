import React, { useState, useEffect } from "react";

import {
  Button,
  Stack,
  FormHelperText,
  Input,
  Typography,
  Divider,
  FormControl,
  Box,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProfile, cleanUp } from "../../actions/users.js";
import HelperText from "../../../../components/HelperText.js";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import ToastAlert from "../../../../components/ToastAlert.js";
import SpinnerComponent from "../../../../components/Spinner.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  courseContainer: {
    padding: "30px",
    margin: "auto",
    background:
      "linear-gradient( 108.74deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100% )",
    boxShadow: "0px 0px 50px -25px rgb(0 0 0 / 50%)",
  },

  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "24px !important",
  },
  stack: {
    marginTop: "20px",
    gap: "20px",
  },
  label: {
    display: "block",
    position: "relative",
    backgroundColor: "#039198",
    color: "#ffffff",
    textAlign: "center",
    fontSize: "18px",
    width: "100%",
    padding: "12px 0",
    margin: "20px auto 0",
    cursor: "pointer",
    borderRadius: "5px",
  },
  typography: {
    color: "red",
    fontSize: "0.9rem",
  },
  input: {
    margin: "15px 0 !important",
    background: "rgba(176, 186, 195, 0.19) !important",
    padding: "10px 16px !important",
    borderRadius: "5px",
  },
  helperText: {
    marginBottom: theme.spacing(1),
    fontWeight: "bold",
    fontSize: "18px",
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    width: "100%",
    background: "#0EAFAF !important",

    color: "white !important",
    fontWeight: "bold  !important",
    margin: "20px auto 20px  !important",
    fontSize: "1.05rem  !important",
    "&:hover": {
      background: "#078989  !important",
      transition: "400ms all easy-in",
    },
    display: "flex",
    padding: "8px 20px !important",
  },
  text: {
    color: "red",
    textAlign: "center  !important",
    marginTop: "20px  !important",
  },
}));

const ProfileForm = () => {
  const [openToast, setOpenToast] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const theme = useTheme();
  const classes = useStyles();

  const { message, success, isCreate, isUpdate, loading, currentUser } =
    useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (success && isCreate) {
      setAlertMessage("User create successfully");
      setOpenToast(true);
    }
    if (success && isUpdate) {
      setAlertMessage("User update successfully");
      setOpenToast(true);
    }
    dispatch(cleanUp());
  }, [isCreate, isUpdate, success, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: currentUser?.name,
      email: currentUser?.email,
    },
  });

  const onSubmit = (data) => {
    var newUser = {
      name: data.username,
      email: data.email,
      id: currentUser?.id,
    };
    if (resetPassword) {
      newUser["oldPassword"] = data?.oldPassword;
      newUser["password"] = data?.password;
    }
    dispatch(updateProfile(newUser));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm" className={classes.mainContainer}>
      {openToast && (
        <ToastAlert
          openToast={openToast}
          setOpenToast={setOpenToast}
          message={alertMessage}
        />
      )}
      {loading && <SpinnerComponent />}
      <Box flexGrow={1} bgcolor="background.default" p={3}>
        <Stack className={classes.courseContainer}>
          <Typography className={classes.title}>Update Profile</Typography>
          <Divider />

          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {message && (
              <Typography className={classes.text}>{message}</Typography>
            )}
            <HelperText text="Username" />
            <FormControl variant="outlined" fullWidth>
              <Input
                disableUnderline
                type={"text"}
                sx={{
                  m: "15px 0 !important",
                  background: "rgba(176, 186, 195, 0.19) !important",
                  padding: "10px 16px !important",
                  borderRadius: "5px",
                }}
                placeholder="Username"
                name="username"
                {...register("username", {
                  required: "User name is required",
                })}
                id="outlined-basic username"
              />
              {!!errors.username && (
                <FormHelperText sx={{ mt: "-10px" }} error id="username-error">
                  {errors.username && errors.username.message}
                </FormHelperText>
              )}
            </FormControl>

            <HelperText text="Email" />
            <FormControl variant="outlined" fullWidth>
              <Input
                disableUnderline
                sx={{
                  m: "15px 0 !important",
                  background: "rgba(176, 186, 195, 0.19) !important",
                  padding: "10px 16px !important",
                  borderRadius: "5px",
                }}
                placeholder="Email"
                name="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="outlined-basic email"
              />
              {!!errors.email && (
                <FormHelperText sx={{ mt: "-10px" }} error id="email-error">
                  {errors.email && errors.email.message}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              sx={{ margin: "15px 0" }}
              onClick={() => setResetPassword(!resetPassword)}
            >
              {resetPassword ? "Don't Reset Password" : "Reset Password"}
            </Button>

            {currentUser && resetPassword && (
              <Stack>
                <HelperText text="Old Password" />
                <FormControl variant="outlined" fullWidth>
                  <Input
                    sx={{
                      m: "15px 0 !important",
                      background: "rgba(176, 186, 195, 0.19) !important",
                      padding: "10px 16px !important",
                      borderRadius: "5px",
                    }}
                    disableUnderline
                    placeholder="Password"
                    name="password"
                    type={showOldPassword ? "text" : "password"}
                    {...register("oldPassword", {
                      required: "Old Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters",
                      },
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowOldPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    id="outlined-basic old password"
                  />
                  {!!errors.oldPassword && (
                    <FormHelperText
                      sx={{ mt: "-10px" }}
                      error
                      id="old-password-error"
                    >
                      {errors.oldPassword && errors.oldPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <HelperText text="New Password" />
                <FormControl variant="outlined" fullWidth>
                  <Input
                    sx={{
                      m: "15px 0 !important",
                      background: "rgba(176, 186, 195, 0.19) !important",
                      padding: "10px 16px !important",
                      borderRadius: "5px",
                    }}
                    disableUnderline
                    placeholder="New password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 4,
                        message: "Password must be at least 4 characters",
                      },
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    id="outlined-basic password"
                  />
                  {!!errors.password && (
                    <FormHelperText
                      sx={{ mt: "-10px" }}
                      error
                      id="password-error"
                    >
                      {errors.password && errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <HelperText text="Confirm New Password" />
                <FormControl variant="outlined" fullWidth>
                  <Input
                    disableUnderline
                    sx={{
                      m: "15px 0 !important",
                      background: "rgba(176, 186, 195, 0.19) !important",
                      padding: "10px 16px !important",
                      borderRadius: "5px",
                    }}
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    id="outlined-basic confirm password"
                  />
                  {!!errors.confirmPassword && (
                    <FormHelperText
                      sx={{ mt: "-10px" }}
                      error
                      id="confirm password-error"
                    >
                      {errors.confirmPassword && errors.confirmPassword.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
            )}

            <Button className={classes.submitButton} type="submit">
              Update Profile
            </Button>
          </form>
        </Stack>

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

export default ProfileForm;
