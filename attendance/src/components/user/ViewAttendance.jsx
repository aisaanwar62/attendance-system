import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewAttendance({ closeModal, _id }) {
  const [attendanceList, setAttendanceList] = useState([]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/users/viewattendance/${_id}`
      );
      console.log("Attendance fetched successfully:", response.data.attendance);

      // Check if response.data.attendance is an array
      if (Array.isArray(response.data.attendance)) {
        setAttendanceList(response.data.attendance);
      } else {
        setAttendanceList([]);
      }
    } catch (error) {
      console.error(
        "Error viewing attendance:",
        error.response?.data?.message || error.message
      );
      setAttendanceList([]);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

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
        <h2 className="text-2xl font-bold mb-4">View Attendance</h2>
        <div>
          <h3 className="text-xl font-semibold mb-2">Attendance List</h3>
          <ul className="list-disc pl-5">
            {attendanceList.length > 0 ? (
              attendanceList.map((entry, index) => (
                <li key={index} className="mb-2">
                  {entry.name} - {entry.date}
                </li>
              ))
            ) : (
              <li>No attendance records found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewAttendance;
