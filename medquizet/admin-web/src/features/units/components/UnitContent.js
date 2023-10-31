import React, { useState } from "react";
import {
  Stack,
  Typography,
  Divider,
  FormControl,
  MenuItem,
} from "@mui/material";

import { useSelector } from "react-redux";
import HelperText from "../../../components/HelperText.js";
import Select from "@mui/material/Select";
import UnitForm from "./UnitForm.js";

const UnitContent = ({ unit }) => {
  const { courses } = useSelector((state) => state.courses);

  const [selectedCourseId, setselectedCourseId] = useState(
    unit?.courseId || courses[0]?.id
  );
  const handleCourseChange = (courseId) => {
    setselectedCourseId(courseId);
  };

  return (
    <Stack sx={{ padding: { xs: "20px", md: "50px" } }}>
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "24px !important",
        }}
      >
        {unit ? "Update Unit" : "Create Unit"}
      </Typography>
      <Divider />

      <Stack sx={{ gap: "20px", margin: "20px 0" }}>
        {!unit && (
          <Stack>
            <HelperText text="Course" />
            <FormControl fullWidth>
              <Select
                displayEmpty
                id="demo-simple-select"
                value={selectedCourseId}
                defaultValue={courses?.[0]?.id}
                onChange={(event) => {
                  handleCourseChange(event.target.value);
                }}
                sx={{
                  background: "#f6f9fa",
                  border: "none !important",
                  mt: "15px",
                }}
              >
                {courses
                  ? courses?.map((course, index) => {
                      return (
                        <MenuItem value={course?.id} key={index}>
                          {course?.title}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
          </Stack>
        )}

        <UnitForm unit={unit} courseId={selectedCourseId} />
      </Stack>
    </Stack>
  );
};

export default UnitContent;
