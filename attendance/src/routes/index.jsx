import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../components/auth/AdminLogin";
import UserLogin from "../components/auth/UserLogin";
import Registration from "../components/auth/Registration";
import AdminLayout from "../adminlayout";
import UserLayout from "../userlayout";
import LandingPage from "../components/mainpage/LandingPage";
import AuthRequired from "./authrequired";
import UserDashboard from "../components/user/UserDashboard";
import EditProfile from "../components/user/EditProfile";
import MarkAttendance from "../components/user/MarkAttendance";
import ViewAttendance from "../components/user/ViewAttendance";
import MarkLeave from "../components/user/MarkLeave";
import NotFound from "../components/Notfound";
import AdminDashboard from "../components/admin/AdminDashboard";
import GenerateReport from "../components/admin/GenerateReport";
import GradingSystem from "../components/admin/GradingSystem";
import ManageAttendance from "../components/admin/ManageAttendance";
import AdminViewAllAttendance from "../components/admin/viewallattendance";
import ManageLeaves from "../components/admin/LeaveApproval";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route element={<UserLayout />}>
          <Route element={<AuthRequired />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/mark-attendance" element={<MarkAttendance />} />
            <Route path="/view-attendance" element={<ViewAttendance />} />
            <Route path="/mark-leave" element={<MarkLeave />} />
          </Route>
        </Route>
        <Route element={<AdminLayout />}>
          <Route element={<AuthRequired />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/view-all-attendance"
              element={<AdminViewAllAttendance />}
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="/generate-report" element={<GenerateReport />} />
            <Route path="/grading-system" element={<GradingSystem />} />
            <Route path="/leave-approval" element={<ManageLeaves />} />
            <Route path="/manage-attendance" element={<ManageAttendance />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route path="/register" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
