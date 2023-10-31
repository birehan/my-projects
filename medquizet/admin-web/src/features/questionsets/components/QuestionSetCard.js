import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DeleteQuestionDialog from "./DeleteQuestionsDialog";
const QuestionSetCard = ({ questionSet, setSelectedComponent }) => {
  const [openDeleteQuestions, setOpenDeleteQuestions] = React.useState(false);

  return (
    <Card
      sx={{
        minWidth: "200px !important",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        maxHeight: "fit-content",
        minHeight: "150px",
        width: {
          xs: "100%",
          sm: "calc(50% - 20px)",
          md: "calc(33.33% - 40px)",
        },
      }}
    >
      {openDeleteQuestions && (
        <DeleteQuestionDialog
          openDeleteQuestions={openDeleteQuestions}
          setOpenDeleteQuestions={setOpenDeleteQuestions}
          questionSet={questionSet}
        />
      )}

      <CardContent>
        <CardHeader
          title={questionSet?.title}
          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        />

        <Typography variant="body1" color="textSecondary">
          {questionSet?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingBottom: "16px", gap: "20px" }}>
        <Stack
          onClick={() =>
            setSelectedComponent(`question/${questionSet?.id}/edit`)
          }
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IconButton aria-label="Edit">
            <Edit />
          </IconButton>
          <Typography>Edit</Typography>
        </Stack>

        <Stack
          onClick={() => setOpenDeleteQuestions(true)}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IconButton aria-label="Delete">
            <Delete />
          </IconButton>
          <Typography>Delete</Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default QuestionSetCard;
