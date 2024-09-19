import React from "react";
import ErrorPage from "../Pages/ErrorPage";
import Root from "../Pages/Root";

export default {
  path: "/",
  element: <Root />,
  errorElement: <ErrorPage />,
};
