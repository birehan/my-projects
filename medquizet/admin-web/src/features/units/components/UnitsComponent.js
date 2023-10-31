import React, { useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import UnitList from "./UnitList";
import CourseFilterDropDown from "../../../features/courses/components/CourseFilterDropDown";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

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

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const UnitsComponent = ({ setSelectedComponent }) => {
  const { units } = useSelector((state) => state.units);
  const { courses } = useSelector((state) => state.courses);

  const [filterCourse, setfilterCourse] = useState("");

  const theme = useTheme();

  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUnits = useMemo(() => {
    if (!units || !units?.length || !Array.isArray(units)) return [];

    return units?.filter((unit) => {
      const searchMatches = unit?.title
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());

      let filterMatches = [];

      if (filterCourse) {
        filterMatches = unit?.courseId === parseInt(filterCourse);
      }

      return searchMatches && filterMatches;
    });
  }, [units, searchTerm, filterCourse]);

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
              placeholder="Search unit"
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
            onClick={() => setSelectedComponent("unit/create")}
            variant="contained"
            color="primary"
            sx={{
              right: "0",
              alignSelf: "flex-end",
            }}
            startIcon={<AddIcon />}
          >
            Add Unit
          </Button>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="right">
          <Stack
            sx={{
              flexDirection: "row",
              mt: "25px",
              gap: "20px",
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
              <FilterAltIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: "1.2rem",
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
          </Stack>
        </Box>

        <UnitList
          setSelectedComponent={setSelectedComponent}
          filteredUnits={filteredUnits}
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
export default UnitsComponent;
