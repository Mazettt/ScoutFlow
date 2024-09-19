import React from "react";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login";

export default {
  path: "login",
  element: <Login />,
  errorElement: <ErrorPage />,
};
