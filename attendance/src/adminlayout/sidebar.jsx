import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <div className="bg-gray-700 text-white w-64  flex justify-center overflow-y-auto p-2">
        <div className="px-6 flex-col items-center mt-5">
          <img
            src="/logoipsum-225.svg"
            alt="Logo"
            className="w-13 h-13 rounded-full cursor-pointer"
          />

          <ul className="space-y-4">
            <li>
              <Link
                to="/admin-dashboard"
                className="block hover:text-blue-500 mt-10"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/view-all-attendance"
                className="block hover:text-blue-500 mt-10"
              >
                View Attendance Record
              </Link>
            </li>
            <li>
              <Link
                to="/manage-attendance"
                className="block hover:text-blue-500 "
              >
                Manage Attendance
              </Link>
            </li>
            <li>
              <Link to="/leave-approval" className="block hover:text-blue-500 ">
                Approve Leaves
              </Link>
            </li>

            <li>
              <Link
                to="/generate-report"
                className="block hover:text-blue-500 "
              >
                Generate Reports
              </Link>
            </li>

            <li>
              <Link to="/grading-system" className="block hover:text-blue-500 ">
                Grading System
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
