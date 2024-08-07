// Utilities
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Custom routes
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

// Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import Layout from "../pages/Layout";
import Home from "../pages/Home";

import ProfilePage from "../pages/profile/ProfilePage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";

import UserListPage from "../pages/user/UserListPage";

import HardwareListPage from "../pages/hardware/HardwareListPage";
import HardwareDetailPage from "../pages/hardware/HardwareDetailPage";
import HardwareCreatePage from "../pages/hardware/HardwareCreatePage";
import HardwareEditPage from "../pages/hardware/HardwareEditPage";

import NodeListPage from "../pages/node/NodeListPage";
import NodeDetailPage from "../pages/node/NodeDetailPage";
import NodeCreatePage from "../pages/node/NodeCreatePage";
import NodeEditPage from "../pages/node/NodeEditPage";
import Embed from "../pages/Embed";
import ErrorPage from "../pages/ErrorPage";

// define route for app
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <Layout />
      </Authenticated>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "node/",
        element: <NodeListPage />,
      },
      {
        path: "node/:id/detail",
        element: <NodeDetailPage />,
      },
      {
        path: "node/create",
        element: <NodeCreatePage />,
      },
      {
        path: "node/:id/edit",
        element: <NodeEditPage />,
      },
      {
        path: "hardware/",
        element: <HardwareListPage />,
      },
      {
        path: "hardware/:id/detail",
        element: <HardwareDetailPage />,
      },
      {
        path: "hardware/create",
        element: <HardwareCreatePage />,
      },
      {
        path: "hardware/:id/edit",
        element: <HardwareEditPage />,
      },
      {
        path: "userlist",
        element: <UserListPage />,
      },
      {
        path: "profile/:username",
        element: <ProfilePage />,
      },
      {
        path: "profile/:username/change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UnAuthenticated>
        <LoginPage />
      </UnAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <UnAuthenticated>
        <RegisterPage />
      </UnAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: (
      <UnAuthenticated>
        <ForgotPasswordPage />
      </UnAuthenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "node/:nodeId/:sensorIndex",
    element: (
      <Authenticated>
        <Embed />
      </Authenticated>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <p>Error</p>,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
