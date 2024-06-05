import React, { useState } from "react";
import axios from "axios";
import { responsiveProperty } from "@mui/material/styles/cssUtils";
import toast from "react-hot-toast";

function MarkAttendance({ closeModal, _id }) {
  const [name, setName] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      // const currentDate = new Date().toLocaleString();
      const currentDate = new Date().toISOString().slice(0, 10);
      const attendanceData = {
        name,
        date: currentDate,
        status: "present",
      };

      try {
        // Send request to mark attendance to the backend
        const response = await axios.post(
          `http://localhost:4001/api/users/markattendance/${_id}`,
          attendanceData
        );

        // Handle success response
        console.log("Attendance marked successfully:", response.data.message);

        // Update attendance list in the frontend
        setAttendanceList([...attendanceList, attendanceData]);
        setName("");
      } catch (error) {
        // Handle error response
        console.error("Error marking attendance:", error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-gray-600 w-full max-w-md p-4 rounded-lg shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
        <form onSubmit={handleMarkAttendance} className="mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Student Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter student name"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Mark Attendance
          </button>
        </form>
        <h3 className="text-xl font-semibold mb-2">
          Attendance List display only for now after you mark attendance
        </h3>
        <ul className="list-disc pl-5">
          {attendanceList.map((entry, index) => (
            <li key={index} className="mb-2">
              {entry.name} - {entry.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MarkAttendance;
