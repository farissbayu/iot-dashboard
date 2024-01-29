import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const isLogin = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: isLogin ? (
      <div>
      </div>
    ) : (
      <h1>Login dulu</h1>
    ),
    children: [
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
        element: <h1>Profile detail</h1>,
      },
      {
        path: "profile/:username/change-password",
        element: <h1>Change password</h1>,
      },
    ],
  },
  {
    path: "register",
    element: <h1>Register</h1>,
  },
  {
    path: "forget-password",
    element: <h1>Forget Password</h1>,
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
