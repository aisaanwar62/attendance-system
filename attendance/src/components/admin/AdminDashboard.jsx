import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="font-bold">Admin Dashboard</h2>
      <ul className="mt-2  bg-gray-200 p-20">
        <li>
          <Link to="/manage-attendance" className="hover:text-blue-500">
            Manage Attendance
          </Link>
        </li>
        <li>
          <Link to="/leave-approval" className="hover:text-blue-500">
            Approve Leaves
          </Link>
        </li>
        <li>
          <Link to="/generate-report" className="hover:text-blue-500">
            Generate Reports
          </Link>
        </li>
        <li>
          <Link to="/grading-system" className="hover:text-blue-500">
            Grading System
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
