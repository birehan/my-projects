import React from "react";
import CoursesComponent from "../features/courses/components/CoursesComponent";
import CourseForm from "../features/courses/components/CourseForm";
import { useSelector } from "react-redux";
import NotFound404Page from "../pages/NotFound404Page";
import UnitsComponent from "./../features/units/components/UnitsComponent";
import UnitPage from "../pages/UnitPage";
import QuestionSetComponent from "../features/questionsets/components/QuestionSetComponent";
import QuestionsPage from "../features/questionsets/pages/QuestionsPage";
import UsersComponent from "../features/authentication/components/UsersComponent";
import UserForm from "../features/authentication/components/Forms/UserForm";
import ProfileForm from "../features/authentication/components/Forms/ProfileForm";

const AdminComponetSelector = ({ selectedComponent, setSelectedComponent }) => {
  const { users } = useSelector((state) => state.users);
  const { courses } = useSelector((state) => state.courses);
  const { units } = useSelector((state) => state.units);
  const { questions } = useSelector((state) => state.questions);

  const courseMatch = selectedComponent.match(/^course\/(\d+)\/edit$/);
  const unitMatch = selectedComponent.match(/^unit\/(\d+)\/edit$/);
  const QuestionMatch = selectedComponent.match(/^question\/(\d+)\/edit$/);
  const userMatch = selectedComponent.match(/^user\/(\d+)\/edit$/);

  const courseId = courseMatch ? courseMatch[1] : null;
  const unitId = unitMatch ? unitMatch[1] : null;
  const questionSetId = QuestionMatch ? QuestionMatch[1] : null;
  const userId = userMatch ? userMatch[1] : null;

  switch (selectedComponent) {
    case "courses": {
      return <CoursesComponent setSelectedComponent={setSelectedComponent} />;
    }
    case "units": {
      return <UnitsComponent setSelectedComponent={setSelectedComponent} />;
    }
    case "questions": {
      return (
        <QuestionSetComponent setSelectedComponent={setSelectedComponent} />
      );
    }

    case "users": {
      return <UsersComponent setSelectedComponent={setSelectedComponent} />;
    }

    case "profile": {
      return <ProfileForm setSelectedComponent={setSelectedComponent} />;
    }

    case "course/create": {
      return <CourseForm />;
    }
    case `course/${courseId}/edit`: {
      var course = courses?.filter(
        (course) => parseInt(course?.id) === parseInt(courseId)
      );

      if (course?.length) {
        return <CourseForm course={course[0]} />;
      } else {
        return <NotFound404Page />;
      }
    }
    case "unit/create": {
      return <UnitPage />;
    }

    case `unit/${unitId}/edit`: {
      var unit = units?.filter(
        (unit) => parseInt(unit?.id) === parseInt(unitId)
      );

      if (unit?.length) {
        return <UnitPage unit={unit[0]} />;
      } else {
        return <NotFound404Page />;
      }
    }

    case "question/create": {
      return <QuestionsPage />;
    }
    case `question/${questionSetId}/edit`: {
      var questionSet = questions?.filter(
        (question) => parseInt(question?.id) === parseInt(questionSetId)
      );

      if (questionSet?.length) {
        return <QuestionsPage questionSet={questionSet[0]} />;
      } else {
        return <NotFound404Page />;
      }
    }

    case "user/create": {
      return <UserForm />;
    }

    case `user/${userId}/edit`: {
      var user = users?.filter(
        (user) => parseInt(user?.id) === parseInt(userId)
      );

      if (user?.length) {
        return <UserForm user={user[0]} />;
      } else {
        return <NotFound404Page />;
      }
    }

    default:
      return <CoursesComponent />;
  }
};

export default AdminComponetSelector;
