import React, { useState } from "react";
import axios from "axios";

import { Stack, Button, Typography } from "@mui/material";
import { API_BASE_URL } from "../../../config";

import { CloudUpload } from "@mui/icons-material";

function QuestionExtractor({ setValue }) {
  const [file, setFile] = useState(null);

  const [errors, setErrors] = useState("");

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);

    const transport = axios.create({
      withCredentials: true,
    });

    transport
      .post(`${API_BASE_URL}/api/extractquestion`, formData)
      .then((response) => {
        if (!response?.data?.length) {
          setErrors("No questions found!");
        } else {
          setErrors("");
        }
        setValue("questions", response.data);
      })
      .catch((error) => {
        setErrors(error?.response?.data?.message);
      });
  };

  return (
    <Stack>
      <Stack sx={{ gap: "20px" }}>
        <label
          htmlFor="file-input"
          style={{
            backgroundColor: "#f6f9fa",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {" "}
            {file && file?.name ? file?.name : "Select File"}
          </Typography>
          <CloudUpload />
          <input
            id="file-input"
            type="file"
            onChange={handleFileUpload}
            accept=".pdf, .docx, .txt"
            style={{ display: "none" }}
          />
        </label>

        <Button
          onClick={() => {
            console.log("hello", file);
            if (file) {
              handleFileSubmit();
            }
          }}
          sx={{
            background: "#0EAFAF",
            color: "white",
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: 700,
            textTransform: "capitalize",
            "&:hover": {
              background: "#0EAFAF",
              opacity: "0.8",
              color: "white",
            },
          }}
        >
          Upload Questions
        </Button>

        {errors && <Typography sx={{ color: "red" }}>{errors}</Typography>}
      </Stack>
    </Stack>
  );
}

export default QuestionExtractor;
