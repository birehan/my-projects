import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import QuestionSetCard from "./QuestionSetCard";
import Loader from "../../../components/Loader";

const CourseList = ({ filteredQuestions, setSelectedComponent }) => {
  const [curPage, setCurPage] = useState(1);
  const questionPerPage = 12;

  const lastIndex = curPage * questionPerPage;
  const firstIndex = lastIndex - questionPerPage;
  const curQuestions = filteredQuestions?.slice(firstIndex, lastIndex);

  const paginate = (event, value) => {
    setCurPage(value);
    window.scrollTo({ top: 0 });
  };
  useEffect(() => {
    setCurPage(1);
  }, [filteredQuestions]);

  if (!filteredQuestions) {
    return <Loader />;
  }

  return (
    <Box>
      <Stack>
        {curQuestions && curQuestions?.length ? (
          <Stack
            // className="course-container"
            sx={{
              padding: { xs: "20px", md: "50px" },
              minHeight: "70vh",
              maxHeight: "fit-content",
              background:
                "linear-gradient( 108.74deg, rgba(255, 255, 255, 0.24) 0%,rgba(255, 255, 255, 0.06) 100%)",
              boxShadow: "0px 0px 50px -25px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(50px)",
              borderRadius: "10px",
              marginTop: "40px",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              {curQuestions.map((questionSet, index) => {
                return (
                  <QuestionSetCard
                    setSelectedComponent={setSelectedComponent}
                    questionSet={questionSet}
                    key={index}
                  />
                );
              })}
            </Stack>
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
              <Typography>No Question Set Found!</Typography>
            </Stack>
          </Box>
        )}
      </Stack>
      <Stack sx={{ margin: "50px auto", alignItems: "center" }}>
        {filteredQuestions?.length > 6 && (
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
            count={Math.ceil(filteredQuestions.length / questionPerPage)}
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
