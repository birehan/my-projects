import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...routeProps }) => {
  const { currentUser } = useSelector((state) => state.users);

  if (!currentUser) {
    return <Navigate to="/login" />;
  } else if (
    currentUser?.role !== "admin" &&
    currentUser?.role !== "super_admin"
  ) {
    return <Navigate to="/403" />;
  } else {
    return (
      <React.Fragment>
        <Component {...routeProps} />;
      </React.Fragment>
    );
  }
};

export default ProtectedRoute;
