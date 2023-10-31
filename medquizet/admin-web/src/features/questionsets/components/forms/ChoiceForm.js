import React from "react";

import { Button, Stack, Input } from "@mui/material";

import FormControl from "@mui/material/FormControl";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";

import { useController } from "react-hook-form";

const QuestionChoice = ({
  choice,
  index,
  remove,
  append,
  selectedQuestion,
  register,
  getValues,
  watch,
  control,
}) => {
  const questionFieldName = `questions[${selectedQuestion}]`;
  const { field: answerField } = useController({
    name: `${questionFieldName}.answer`,
    control,
    defaultValue: "",
  });
  const { field: choiceIdField } = useController({
    name: `${questionFieldName}.choices[${index}].id`,
    control,
    defaultValue: "",
  });

  const handleChoiceSelect = (selectedQuestion, index, choiceId) => {
    answerField.onChange(choiceId);
    choiceIdField.onChange(choiceId);
  };

  return (
    <Stack sx={{ gap: "20px" }}>
      <Stack
        sx={{
          flexDirection: "row",
          gap: "10px",
          width: "100% !important",
        }}
      >
        {/* {index + 1 < getValues(`questions.${selectedQuestion}.choices.length`) ? ( */}
        <Button
          onClick={() => {
            if (getValues(`questions.${selectedQuestion}.choices.length`) > 1) {
              if (
                watch(`questions.${selectedQuestion}.answer`) ===
                watch(`questions.${selectedQuestion}.choices.${index}.id`)
              ) {
                answerField.onChange("");
              }
              remove(index);
            }
          }}
          sx={{ width: "20px", background: "#f6f9fa", color: "black" }}
        >
          <RemoveIcon />
        </Button>

        <FormControl sx={{ width: "100%" }} variant="standard">
          <Input
            disableUnderline
            fullWidth
            type="text"
            {...register(
              `questions[${selectedQuestion}].choices[${index}].value`,
              {
                required: "question choice is required",
              }
            )}
            variant="outlined"
            id="outlined-basic title"
            sx={{
              background: "#f6f9fa",
              padding: "8px 16px",
              borderRadius: "5px",
            }}
          />
        </FormControl>

        <Button
          onClick={() => {
            handleChoiceSelect(selectedQuestion, index, choice.id);
          }}
          sx={{
            width: "20px",
            background:
              watch(`questions.${selectedQuestion}.answer`) ===
              watch(`questions.${selectedQuestion}.choices.${index}.id`)
                ? "#078989"
                : "#f6f9fa",
            color:
              watch(`questions.${selectedQuestion}.answer`) ===
              watch(`questions.${selectedQuestion}.choices.${index}.id`)
                ? "white"
                : "black",
            "&:hover": {
              background:
                watch(`questions.${selectedQuestion}.answer`) ===
                watch(`questions.${selectedQuestion}.choices.${index}.id`)
                  ? "#078989"
                  : "#f6f9fa",
            },
          }}
        >
          <DoneIcon />
        </Button>
      </Stack>
      {index + 1 ===
        getValues(`questions.${selectedQuestion}.choices.length`) && (
        <Button
          onClick={() => {
            if (
              getValues(`questions.${selectedQuestion}.choices.${index}.value`)
            ) {
              append({ id: index + 1, value: "" });
            }
          }}
          sx={{ width: "20px", background: "#f6f9fa", color: "black" }}
        >
          <AddIcon />
        </Button>
      )}
    </Stack>
  );
};
export default QuestionChoice;
