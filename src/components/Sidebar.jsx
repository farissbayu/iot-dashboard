import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { getUserDetail } from "../api/user-profile";

export default function Sidebar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData")) || null;

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          backgroundColor: "#0083C9",
          borderRadius: "8px",
        }
      : null;

  function handleLogout() {
    auth.logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="bg-primary w-[200px] h-screen flex flex-col fixed">
      <div id="logo" className="">
        <NavLink to="/" className="flex flex-col items-center my-4">
          <img src="/logo-ipb.png" width="54px" alt="logo IPB" />
          <h1 className="font-bold text-white my-3">IoT Dashboard</h1>
        </NavLink>
      </div>
      <nav
        id="nav-group-top"
        className="flex flex-col text-center items-center text-navFont flex-1 py-4 relative"
      >
        <NavLink
          to={`node/${user.username.toLowerCase()}`}
          style={activeStyle}
          className="w-5/6 py-3 hover:underline"
        >
          Node
        </NavLink>
        <NavLink
          to="hardware"
          style={activeStyle}
          className="w-5/6 py-3 hover:underline"
        >
          Hardware
        </NavLink>
        {user.is_admin && (
          <NavLink
            to="userlist"
            style={activeStyle}
            className="w-5/6 py-3 hover:underline"
          >
            User
          </NavLink>
        )}
        <NavLink
          to={`profile/${user.username.toLowerCase()}`}
          style={activeStyle}
          className="w-5/6 py-3 absolute bottom-0 mb-4 hover:underline"
        >
          Profile
        </NavLink>
      </nav>
      <button
        type="button"
        className="w-5/6 py-3 mx-auto mb-6 text-white hover:underline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}
