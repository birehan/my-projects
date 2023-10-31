import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import QuestionInformation from "../components/QuestionInformation";
import QuestionForm from "../components/forms/QuestionForm";
import QuestionsSections from "../components/forms/QuestionsSections";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createQuestions,
  cleanUpQuesions,
  getQuestionsById,
  updateQuestions,
} from "../actions/questions.js";
import ToastAlert from "../../../components/ToastAlert";
import { useFieldArray, useForm } from "react-hook-form";
import { validateQuestion } from "../components/ValidateQuestion";
import SpinnerComponent from "../../../components/Spinner";

const QuestionsPage = ({ questionSet }) => {
  const [questionMessage, setQuestionMessage] = useState("");
  const dispatch = useDispatch();

  const { question } = useSelector((state) => state.questions);

  useEffect(() => {
    if (questionSet) {
      dispatch(getQuestionsById(questionSet?.id));
    }
  }, [questionSet, dispatch]);

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const { success, isCreate, isUpdate, loading } = useSelector(
    (state) => state.questions
  );
  const [openToast, setOpenToast] = useState(false);

  useEffect(() => {
    if (success && isCreate) {
      setQuestionMessage("Questions create successfully");
      setOpenToast(true);
    }
    if (success && isUpdate) {
      setQuestionMessage("Questions update successfully");
      setOpenToast(true);
    }
    dispatch(cleanUpQuesions());
  }, [isCreate, isUpdate, dispatch, success]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    getValues,
    setValue,
    setError,
    trigger,
  } = useForm({
    defaultValues: {
      id: questionSet?.id || 0,
      title: questionSet?.title || "",
      description: questionSet?.description || "",
      unitId: questionSet?.unitId || "",
      courseId: questionSet?.courseId || "",

      questions: [
        {
          title: "",
          choices: [{ id: 0, value: "" }],
          answer: "",
          explanation: "No explanation",
        },
      ],

      duration: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  useEffect(() => {
    if (question?.length > 0 && questionSet) {
      let array = [];
      for (let i = 0; i < question.length; i++) {
        const cur = {
          ...question[i],
          choices: question[i].choices ? JSON.parse(question[i].choices) : [],
        };
        array.push(cur);
      }
      setValue("questions", array);
    }
    if (questionSet) {
      const { hour, minute, second } = JSON.parse(questionSet?.duration);
      setValue("duration.hour", parseInt(hour));
      setValue("duration.minute", parseInt(minute));
      setValue("duration.second", parseInt(second));
    }
  }, [question, questionSet, setValue]);

  const onSubmit = (data) => {
    let isValid = true;
    data.questions.forEach((question, index) => {
      const errors = validateQuestion(question); // replace with your own validation function
      if (errors) {
        isValid = false;
        errors.forEach((error) => {
          setError(`questions[${index}].${error.field}`, {
            type: error.type,
            message: error.message,
          });
        });
      }
    });

    if (isValid) {
      console.log(data);
      // Submit the form
      if (!questionSet) {
        dispatch(createQuestions(data));
      } else {
        dispatch(updateQuestions(data));
      }
    }
  };

  return (
    <Stack sx={{ background: "#f6f9fa", height: "fit-content" }}>
      {openToast && (
        <ToastAlert
          openToast={openToast}
          setOpenToast={setOpenToast}
          message={questionMessage}
        />
      )}

      {loading && <SpinnerComponent />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          className="questions-container"
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            gap: "10px",
            background: "#f6f9fa",
            // margin: "40px auto 40px",
            // border: "3px solid green",
            width: {
              xs: "95%",
              sm: "90%",
              md: "80%",
              lg: "100%",
            },
            margin: "40px auto",
          }}
        >
          <Box sx={{ flex: 1, flexWrap: "wrap" }}>
            <QuestionInformation
              watch={watch}
              register={register}
              errors={errors}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            {" "}
            <Stack
              className="content-container"
              sx={{
                margin: { xs: "30px 0", lg: "30px 10px" },
                overflow: "auto",
                gap: "20px",
                background: "white",
                borderRadius: "10px !important",
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              <QuestionForm
                key={fields[selectedQuestion]?.id}
                register={register}
                errors={errors}
                control={control}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                question={fields[selectedQuestion]}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                trigger={trigger}
                remove={remove}
                questionLength={fields.length}
              />
            </Stack>
          </Box>
          <Box sx={{ flex: 1 }}>
            {" "}
            <Stack
              className="content-container"
              sx={{
                margin: { xs: "0px 0 20px", lg: "30px 30px 10px" },

                overflow: "auto",
                gap: "20px",
                borderRadius: "10px !important",
                background: "white",
              }}
            >
              <QuestionsSections
                fields={fields}
                append={append}
                setSelectedQuestion={setSelectedQuestion}
                selectedQuestion={selectedQuestion}
                errors={errors}
                setValue={setValue}
              />
            </Stack>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default QuestionsPage;
