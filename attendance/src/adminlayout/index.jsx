import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

function AdminLayout() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
