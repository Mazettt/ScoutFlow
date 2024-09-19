import React from "react";
import { createBrowserRouter, RouterProvider as ReactRouter } from "react-router-dom";

import RootRouter from "./Root";
import DashboardRouter from "./Dashboard";
import LoginRouter from "./Login";
import RegisterRouter from "./Register";

const router = createBrowserRouter([
  RootRouter,
  DashboardRouter,
  LoginRouter,
  RegisterRouter,
]);

export default function RouterProvider() {
  return <ReactRouter router={router} />;
}
