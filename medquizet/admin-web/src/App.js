import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForbiddenPage from "./pages/ForbiddenPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./features/authentication/pages/LoginPage.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "./ProtectedRoute";
import { useDispatch } from "react-redux";
import { getCourses } from "./features/courses/actions/courses";
import { getAllUnits } from "./features/units/actions/units";
import { getQuestions } from "./features/questionsets/actions/questions";
import { getUsers } from "./features/authentication/actions/users";

const theme = createTheme({
  palette: {
    primary: {
      main: "#039198",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
    dispatch(getAllUnits());
    dispatch(getQuestions());
    dispatch(getUsers());
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={AdminPage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/403" element={<ForbiddenPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
