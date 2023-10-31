import React from "react";
import { Stack } from "@mui/material";
import QuestionInfoForm from "./forms/QuestionInfoForm";

const QuestionInformation = ({ register, errors, watch }) => {
  return (
    <Stack
      className="content-container"
      sx={{
        margin: { xs: "50px 0 0", lg: "30px 10px 30px 30px" },

        gap: "30px",
      }}
    >
      <QuestionInfoForm register={register} errors={errors} watch={watch} />
    </Stack>
  );
};

export default QuestionInformation;
