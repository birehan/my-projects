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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cleanUp, createCourse, updateCourse } from "../actions/courses.js";
import HelperText from "../../../components/HelperText.js";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import ToastAlert from "../../../components/ToastAlert.js";
import SpinnerComponent from "../../../components/Spinner.js";

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
  // formControl: {
  //   width: "100%",
  // },

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
    mt: "10px  !important",
  },
}));

const CourseForm = ({ course }) => {
  const [openToast, setOpenToast] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const theme = useTheme();
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [fileError, setfileError] = useState("");

  const { message, success, isCreate, isUpdate, loading } = useSelector(
    (state) => state.courses
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (success && isCreate) {
      setAlertMessage("Course create successfully");
      setOpenToast(true);
    }
    if (success && isUpdate) {
      setAlertMessage("Course update successfully");
      setOpenToast(true);
    }
    dispatch(cleanUp());
  }, [isCreate, isUpdate, dispatch, success]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: course?.title,
      description: course?.description,
    },
  });

  const onSubmit = (data) => {
    if (!image && !course) {
      setfileError("Course image is required");

      return;
    }
    const formData = new FormData();
    formData.append("id", course?.id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", image);

    if (!course) {
      dispatch(createCourse(formData));
    } else {
      dispatch(updateCourse(formData));
    }
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
          <Typography className={classes.title}>
            {course ? "Update Course" : "Create Course"}
          </Typography>
          <Divider />

          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            {message && (
              <Typography className={classes.text}>{message}</Typography>
            )}
            <Stack sx={{ gap: "20px" }}>
              <Stack className={classes.container}>
                <HelperText text={"Course Image"} />
                <input
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                    setImageName(event.target.files[0].name);
                  }}
                  id="upload-image"
                  style={{ display: "none" }}
                  type="file"
                  className="input"
                  accept="image/*"
                  name="course image"
                />
                <label className={classes.label} htmlFor="upload-image">
                  {imageName ? (
                    imageName
                  ) : (
                    <Box>
                      <i className="fas fa-upload"></i> &nbsp; Choose A Photo
                    </Box>
                  )}
                </label>
                {fileError && (
                  <Typography className={classes.typography}>
                    {fileError}
                  </Typography>
                )}
              </Stack>

              <Stack>
                <HelperText text="Course Name" className={classes.helperText} />
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                >
                  <Input
                    disableUnderline
                    type={"text"}
                    className={classes.input}
                    placeholder="Course name"
                    name="title"
                    {...register("title", {
                      required: "Course name is required",
                      maxLength: {
                        value: 50,
                        message: "course title should not exceed 50 characters",
                      },
                    })}
                    id="outlined-basic title"
                  />
                  {!!errors.title && (
                    <FormHelperText
                      className={classes.helperText}
                      error
                      id="title-error"
                    >
                      {errors.title && errors.title.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
              <Stack>
                <HelperText
                  text={"Description"}
                  className={classes.helperText}
                />
                <FormControl
                  variant="standard"
                  fullWidth
                  className={classes.formControl}
                >
                  <Input
                    multiline
                    minRows={6}
                    disableUnderline
                    placeholder="Description"
                    type="text"
                    {...register("description", {
                      required: "description is required",
                      maxLength: {
                        value: 100,
                        message: "description should not exceed 100 characters",
                      },
                    })}
                    value={register.description}
                    variant="outlined"
                    id="outlined-basic description"
                    className={classes.input}
                  />
                  {!!errors.description && (
                    <FormHelperText error id="description-error">
                      {errors.description && errors.description.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Stack>

            <Button className={classes.submitButton} type="submit">
              {course ? "Update Course" : "Create Course"}
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

export default CourseForm;
