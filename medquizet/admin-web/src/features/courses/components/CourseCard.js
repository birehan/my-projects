import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { API_BASE_URL } from "../../../config";
import { Edit, Delete } from "@mui/icons-material";
import DeleteCourse from "./DeleteCourseDialog";
const CourseCard = ({ course, setSelectedComponent }) => {
  const [openDeleteCourse, setOpenDeleteCourse] = React.useState(false);

  return (
    <Card
      sx={{
        minWidth: "200px !important",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        maxHeight: "fit-content",
        minHeight: "300px",
        width: {
          xs: "100%",
          sm: "calc(50% - 20px)",
          md: "calc(33.33% - 40px)",
        },
      }}
    >
      {openDeleteCourse && (
        <DeleteCourse
          openDeleteCourse={openDeleteCourse}
          setOpenDeleteCourse={setOpenDeleteCourse}
          course={course}
        />
      )}
      <CardMedia
        component="img"
        image={`${API_BASE_URL}/uploads/${course.image}`}
        alt={course.title}
        height="200"
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <CardHeader
          title={course.title}
          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        />

        <Typography variant="body1" color="textSecondary">
          {course.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ paddingBottom: "16px", gap: "20px" }}>
        <Stack
          onClick={() => setSelectedComponent(`course/${course?.id}/edit`)}
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
          onClick={() => setOpenDeleteCourse(true)}
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
      {/* <Stack sx={{ gap: "20px", flexDirection: "row", paddingBottom: "16px" }}>
        <Stack
          onClick={() => setSelectedComponent(`units/${course?.id}`)}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IconButton aria-label="Edit">
            <Layers />
          </IconButton>
          <Typography>Units</Typography>
        </Stack>

        <Stack
          onClick={() => setOpenDeleteCourse(true)}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <IconButton aria-label="Delete">
            <QuestionMarkIcon />
          </IconButton>
          <Typography>Questions</Typography>
        </Stack>
      </Stack> */}
    </Card>
  );
};

export default CourseCard;
