import React, { useState, link } from "react";
import { useLocation, Link } from "react-router-dom";
import Sidebar from "../../userlayout/sidebar";
import MarkAttendance from "./MarkAttendance";
import ViewAttendance from "./ViewAttendance";
import MarkLeave from "./MarkLeave";

function UserDashboard() {
  const location = useLocation();
  console.log(location.state); // Log location state (id)
  const { _id } = location.state || {}; // Access id from location state

  const [isMarkAttendanceOpen, setIsMarkAttendanceOpen] = useState(false);
  const [isViewAttendanceOpen, setIsViewAttendanceOpen] = useState(false);
  const [isMarkLeaveOpen, setIsMarkLeaveOpen] = useState(false);

  const openMarkAttendanceModal = () => {
    setIsMarkAttendanceOpen(true);
  };

  const closeMarkAttendanceModal = () => {
    setIsMarkAttendanceOpen(false);
  };

  const openViewAttendanceModal = () => {
    setIsViewAttendanceOpen(true);
  };

  const closeViewAttendanceModal = () => {
    setIsViewAttendanceOpen(false);
  };
  const openMarkLeaveModal = () => {
    setIsMarkLeaveOpen(true);
  };

  const closeMarkLeaveModal = () => {
    setIsMarkLeaveOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar _id={_id} /> {/* Pass id to Sidebar */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <h2 className="mb-4 text-xl font-bold">Student Dashboard</h2>
        <div className="flex space-x-4">
          <button
            onClick={openMarkAttendanceModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Mark Attendance
          </button>

          <button
            onClick={openMarkLeaveModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Mark Leave
          </button>

          <button
            onClick={openViewAttendanceModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View Attendance
          </button>
        </div>
      </div>
      {isMarkAttendanceOpen && (
        <MarkAttendance closeModal={closeMarkAttendanceModal} _id={_id} />
      )}
      {isViewAttendanceOpen && (
        <ViewAttendance closeModal={closeViewAttendanceModal} _id={_id} />
      )}
      {isMarkLeaveOpen && (
        <MarkLeave closeModal={closeMarkLeaveModal} _id={_id} />
      )}
    </div>
  );
}

export default UserDashboard;
