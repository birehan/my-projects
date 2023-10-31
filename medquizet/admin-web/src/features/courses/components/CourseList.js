import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import CourseCard from "./CourseCard";
import Loader from "../../../components/Loader";

const CourseList = ({ filteredCourses, setSelectedComponent }) => {
  const [curPage, setCurPage] = useState(1);
  const coursePerPage = 6;

  const lastIndex = curPage * coursePerPage;
  const firstIndex = lastIndex - coursePerPage;
  const curCourses = filteredCourses?.slice(firstIndex, lastIndex);

  const paginate = (event, value) => {
    setCurPage(value);
    window.scrollTo({ top: 0 });
  };
  useEffect(() => {
    setCurPage(1);
  }, [filteredCourses]);

  if (!filteredCourses) {
    return <Loader />;
  }

  return (
    <Box>
      <Stack>
        {curCourses && curCourses.length ? (
          <Stack
            className="course-container"
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: { xs: "20px", md: "50px" },
              padding: { xs: "20px", md: "50px" },
              justifyContent: { xs: "center", lg: "center" },
            }}
          >
            {curCourses.map((course, index) => {
              return (
                <CourseCard
                  setSelectedComponent={setSelectedComponent}
                  course={course}
                  key={index}
                />
              );
            })}
          </Stack>
        ) : (
          <Box className="no-course">
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "60px",
                padding: "30px",
                justifyContent: { xs: "center", lg: "center" },
                background: "white",
                borderRadius: "10px",
                mt: "30px",
              }}
            >
              {" "}
              <Typography>No Course Found!</Typography>
            </Stack>
          </Box>
        )}
      </Stack>
      <Stack sx={{ margin: "50px auto", alignItems: "center" }}>
        {filteredCourses?.length > 6 && (
          <Pagination
            sx={{
              color: "#078989",
              //   border: "5px solid green",
              ul: {
                color: "red",
              },
              ".css-yx0nvq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected ":
                {
                  background: "white !important",
                  color: "#078989",

                  borderRadius: "50% !important",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                },
              ".css-n8417t-MuiSvgIcon-root-MuiPaginationItem-icon": {
                color: "#078989",
                fontSize: "2rem",
              },
              zIndex: "10",
            }}
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(filteredCourses.length / coursePerPage)}
            page={curPage}
            size="large"
            onChange={paginate}
          ></Pagination>
        )}
      </Stack>
    </Box>
  );
};

export default CourseList;
