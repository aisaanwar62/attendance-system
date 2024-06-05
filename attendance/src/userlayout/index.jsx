import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { UserProvider } from "../context/userContext";

function UserLayout() {
  return (
    <div className="flex-1 flex flex-col ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default UserLayout;
