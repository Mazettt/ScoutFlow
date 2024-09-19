import React from "react";
import ErrorPage from "../Pages/ErrorPage";
import Register from "../Pages/Register";

export default {
  path: "register",
  element: <Register />,
  errorElement: <ErrorPage />,
};
