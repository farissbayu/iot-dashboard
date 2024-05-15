// Utilities
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
import HardwareCreatePage, {
  action as createHardwareAction,
} from "../pages/hardware/HardwareCreatePage";
import NodeListPage from "../pages/node/NodeListPage";
import NodeDetailPage from "../pages/node/NodeDetailPage";
import NodeCreatePage, {
  action as createNodeAction,
} from "../pages/node/NodeCreatePage";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticated>
        <Layout />
      </Authenticated>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "node/:username",
        element: <NodeListPage />,
      },
      {
        path: "node/:username/:id/detail",
        element: <NodeDetailPage />,
      },
      {
        path: "node/:username/create",
        action: createNodeAction,
        element: <NodeCreatePage />,
      },
      {
        path: "node/:username/:id/edit",
        element: <h1>Edit node</h1>,
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
        action: createHardwareAction,
        element: <HardwareCreatePage />,
      },
      {
        path: "hardware/:id/edit",
        element: <h1>Edit hardware</h1>,
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
  },
  {
    path: "/register",
    element: (
      <UnAuthenticated>
        <RegisterPage />
      </UnAuthenticated>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <UnAuthenticated>
        <ForgotPasswordPage />
      </UnAuthenticated>
    ),
  },
  {
    path: "*",
    element: <p>Error</p>
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
