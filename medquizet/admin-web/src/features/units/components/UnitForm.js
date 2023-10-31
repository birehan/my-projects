import React, { useEffect, useState } from "react";

import {
  Button,
  Stack,
  FormHelperText,
  Input,
  FormControl,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createUnit, updateUnit } from "../actions/units.js";
import HelperText from "../../../components/HelperText.js";
import { useSelector } from "react-redux";
import { cleanUp } from "../actions/units.js";
import ToastAlert from "../../../components/ToastAlert.js";
import { makeStyles } from "@mui/styles";
import SpinnerComponent from "../../../components/Spinner.js";

const useStyles = makeStyles((theme) => ({
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
}));

const UnitForm = ({ courseId, unit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openToast, setOpenToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { message, success, isCreate, isUpdate, loading } = useSelector(
    (state) => state.units
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: unit ? unit?.title : "",
    },
  });

  const onSubmit = (data) => {
    const newUnit = {
      courseId: courseId,
      title: data.title,
    };
    if (unit) {
      dispatch(updateUnit({ ...newUnit, id: unit.id }));
    } else {
      dispatch(createUnit(newUnit));
    }
  };

  useEffect(() => {
    if (success && isCreate) {
      setAlertMessage("Unit create successfully");
      setOpenToast(true);
    }
    if (success && isUpdate) {
      setAlertMessage("Unit update successfully");
      setOpenToast(true);
    }
    dispatch(cleanUp());
  }, [isCreate, isUpdate, success, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {openToast && (
        <ToastAlert
          openToast={openToast}
          setOpenToast={setOpenToast}
          message={alertMessage}
        />
      )}

      {message && (
        <Typography
          sx={{
            color: "red",
            textAlign: "center",
            mt: "10px",
          }}
        >
          {message}
        </Typography>
      )}

      {loading && <SpinnerComponent />}
      <Stack sx={{ gap: "20px", margin: "20px 0" }}>
        <Stack>
          <HelperText text="Unit title" />
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
              placeholder="Unit"
              name="title"
              {...register("title", {
                required: "Unit title is required",
              })}
              id="outlined-basic unit title"
            />
            {!!errors.title && (
              <FormHelperText sx={{ mt: "-10px" }} error id="username-error">
                {errors.title && errors.title.message}
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      </Stack>

      <Button className={classes.submitButton} type="submit">
        Save
      </Button>
    </form>
  );
};

export default UnitForm;
