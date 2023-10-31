import React, { useState } from "react";
import {
  Button,
  Stack,
  Typography,
  Input,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { loginUser } from "../../actions/users.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import HelperText from "../../../../components/HelperText.js";
import SpinnerComponent from "../../../../components/Spinner.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const styles = {
  redText: {
    color: "red",
    textAlign: "center",
    mb: "10px",
  },
  input: {
    m: "15px 0 !important",
    background: "rgba(176, 186, 195, 0.19) !important",
    padding: "10px 16px !important",
    borderRadius: "5px",
  },
  forgetPassword: {
    margin: "20px",
    textAlign: "center",
    color: "#00b5be",
    "&:hover": {
      cursor: "pointer",
    },
  },
  submitButtonStyle: {
    width: "100%",
    background: "#0EAFAF",

    color: "white",
    fontWeight: "bold",
    m: "40px auto 0",
    fontSize: "1.05rem",
    "&:hover": {
      background: "#078989",
      transition: "400ms all easy-in",
    },
    display: "flex",
    padding: "8px 20px !important",
  },
};
const LoginForm = () => {
  const { message, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    dispatch(
      loginUser({
        email: data?.email,
        password: data?.password,
      })
    );
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack sx={{ width: "100%", gap: "10px" }}>
      {loading && <SpinnerComponent />}
      <form onSubmit={handleSubmit(onSubmit)}>
        {message && <Typography sx={styles.redText}>{message}</Typography>}
        <HelperText text="Email" />
        <FormControl variant="outlined" fullWidth>
          <Input
            disableUnderline={true}
            sx={styles.input}
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

        <HelperText text="Password" />
        <FormControl variant="outlined" fullWidth>
          <Input
            sx={styles.input}
            disableUnderline={true}
            placeholder="Password"
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
            <FormHelperText sx={{ mt: "-10px" }} error id="password-error">
              {errors.password && errors.password.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button sx={styles.submitButtonStyle} type="submit">
          Login
        </Button>
      </form>
    </Stack>
  );
};

export default LoginForm;
