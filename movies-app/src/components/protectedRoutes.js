import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { isAuthenticated } = props;
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
