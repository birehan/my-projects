import React, { useState, useMemo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import CourseFilterDropDown from "../../courses/components/CourseFilterDropDown.js";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import UnitFilterDropDown from "../../units/components/UnitFilterDropDown.js";

import {
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import QuestionSetList from "./QuestionSetList";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const QuestionSetComponent = ({ setSelectedComponent }) => {
  const { courses } = useSelector((state) => state.courses);
  const { units } = useSelector((state) => state.units);
  const { questions } = useSelector((state) => state.questions);
  const [filterCourse, setfilterCourse] = useState("");
  const [filterUnit, setfilterUnit] = useState("");
  const [selectedUnits, setSelectedUnits] = useState(units);

  const theme = useTheme();

  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuestions = useMemo(() => {
    if (!questions || !questions.length || !Array.isArray(questions)) return [];

    return questions?.filter((questionSet) => {
      const searchMatches = questionSet?.title
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());

      let filterMatchCourse = [];

      if (filterCourse) {
        filterMatchCourse = questionSet?.courseId === parseInt(filterCourse);
      }

      let filterMatchUnit = [];

      if (filterUnit) {
        filterMatchUnit = questionSet?.unitId === parseInt(filterUnit);
      }

      return searchMatches && filterMatchCourse && filterMatchUnit;
    });
  }, [questions, searchTerm, filterCourse, filterUnit]);

  useEffect(() => {
    if (filterCourse) {
      setSelectedUnits(
        selectedUnits?.filter((unit) => unit?.courseId === filterCourse)
      );
    } else {
      setSelectedUnits(units);
    }
  }, [filterCourse, setSelectedUnits, selectedUnits, units]);

  return (
    <Container maxWidth="lg" className={classes.mainContainer}>
      <Box flexGrow={1} bgcolor="background.default" p={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
              gap: "20px",
              justifyContent: "space-between",
            },
          }}
        >
          <Box mr={2} sx={{ width: { xs: "100%", md: "400px" } }}>
            <TextField
              id="outlined-basic"
              placeholder="Search question"
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
            onClick={() => setSelectedComponent("question/create")}
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "flex-end",
            }}
            startIcon={<AddIcon />}
          >
            Add Questions
          </Button>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="right">
          <Stack
            sx={{
              flexDirection: "row",
              mt: "25px",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              flexDirection="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <FilterAltIcon />
              <Typography
                sx={{
                  fontSize: "1.43rem",
                }}
              >
                Filter by
              </Typography>
            </Stack>

            <CourseFilterDropDown
              filterCourse={filterCourse}
              setfilterCourse={setfilterCourse}
              courses={courses}
            />

            <UnitFilterDropDown
              units={selectedUnits}
              filterUnit={filterUnit}
              setfilterUnit={setfilterUnit}
            />
          </Stack>
        </Box>
        <QuestionSetList
          setSelectedComponent={setSelectedComponent}
          filteredQuestions={filteredQuestions}
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
export default QuestionSetComponent;
