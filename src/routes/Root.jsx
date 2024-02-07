// Utilities
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Pages
import LoginPage, { action as loginAction } from "../pages/auth/LoginPage";
import RegisterPage, { action as registerAction } from "../pages/auth/RegisterPage";
import ForgetPasswordPage, {
  action as forgetPasswordAction,
} from "../pages/auth/ForgetPasswordPage";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import ChangePasswordPage, { action as changePasswordAction } from "../pages/profile/ChangePasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "node/:username",
        element: <h1>Node list</h1>,
      },
      {
        path: "node/:id/detail",
        element: <h1>Node detail</h1>,
      },
      {
        path: "node/create",
        element: <h1>Create node</h1>,
      },
      {
        path: "node/:id/edit",
        element: <h1>Edit node</h1>,
      },
      {
        path: "hardware/",
        element: <h1>Hardware list</h1>,
      },
      {
        path: "hardware/:id/detail",
        element: <h1>Hardware detail</h1>,
      },
      {
        path: "hardware/create",
        element: <h1>Create hardware</h1>,
      },
      {
        path: "hardware/:id/edit",
        element: <h1>Edit hardware</h1>,
      },
      {
        path: "user-list",
        element: <h1>User list</h1>,
      },
      {
        path: "user-list/detail",
        element: <h1>User detail</h1>,
      },
      {
        path: "profile/:username",
        element: <ProfilePage />,
      },
      {
        path: "profile/:username/change-password",
        action: changePasswordAction,
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: "login",
    action: loginAction,
    element: <LoginPage />,
  },
  {
    path: "register",
    action: registerAction,
    element: <RegisterPage />,
  },
  {
    path: "forget-password",
    action: forgetPasswordAction,
    element: <ForgetPasswordPage />,
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
