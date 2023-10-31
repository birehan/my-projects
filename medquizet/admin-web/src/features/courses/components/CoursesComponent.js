import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import CourseList from "../components/CourseList";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const CoursesComponent = ({ setSelectedComponent }) => {
  const { courses } = useSelector((state) => state.courses);

  const theme = useTheme();

  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredCourses = [];

  if (courses && Array.isArray(courses)) {
    filteredCourses = courses?.filter((course) =>
      course?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  }

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
      <Box flexGrow={1} bgcolor="background.default" p={3}>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
              gap: "20px",
              justifyContent: "space-between",
            },
            position: "relative",
          }}
        >
          <Box mr={2} sx={{ width: { xs: "100%", md: "400px" } }}>
            <TextField
              id="outlined-basic"
              placeholder="Search course"
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: false,
              }}
            />
          </Box>
          <Button
            onClick={() => setSelectedComponent("course/create")}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              alignSelf: "flex-end",
            }}
          >
            Add Course
          </Button>
        </Box>
        <CourseList
          setSelectedComponent={setSelectedComponent}
          filteredCourses={filteredCourses}
        />
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
export default CoursesComponent;
