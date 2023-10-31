import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import UnitCard from "./UnitCard";
import Loader from "../../../components/Loader";

const UnitList = ({ filteredUnits, setSelectedComponent }) => {
  const [curPage, setCurPage] = useState(1);
  const unitPerPage = 12;

  const lastIndex = curPage * unitPerPage;
  const firstIndex = lastIndex - unitPerPage;
  const curUnits = filteredUnits?.slice(firstIndex, lastIndex);

  const paginate = (event, value) => {
    setCurPage(value);
    window.scrollTo({ top: 0 });
  };
  useEffect(() => {
    setCurPage(1);
  }, [filteredUnits]);

  if (!filteredUnits) {
    return <Loader />;
  }

  return (
    <Box>
      <Stack>
        {curUnits && curUnits.length ? (
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
              /* Note: backdrop-filter has minimal browser support */

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
              {curUnits.map((unit, index) => {
                return (
                  <UnitCard
                    setSelectedComponent={setSelectedComponent}
                    unit={unit}
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
              <Typography>No Unit Found!</Typography>
            </Stack>
          </Box>
        )}
      </Stack>
      <Stack sx={{ margin: "50px auto", alignItems: "center" }}>
        {filteredUnits?.length > 6 && (
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
            count={Math.ceil(filteredUnits.length / unitPerPage)}
            page={curPage}
            size="large"
            onChange={paginate}
          ></Pagination>
        )}
      </Stack>
    </Box>
  );
};

export default UnitList;
