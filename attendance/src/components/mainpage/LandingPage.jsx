// LandingPage.js
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbarmain from "./navbar";
import Main from "./main";

function LandingPage() {
  return (
    <div>
      <Navbarmain />
      <Main />

      <Outlet />
    </div>
  );
}

export default LandingPage;
