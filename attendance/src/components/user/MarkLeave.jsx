import React, { useState, useEffect } from "react";
import axios from "axios";

function MarkLeave({ closeModal, _id }) {
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/users/getleaverequests/${_id}`
        );
        setLeaveRequests(response.data.leaveRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, [_id]);

  useEffect(() => {
    const today = new Date();
    const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setMinDate(formatDate(today));
    setMaxDate(formatDate(lastDayOfYear));
  }, []);

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (leaveDate) {
      const leaveData = {
        date: leaveDate,
      };

      try {
        const { data } = await axios.post(
          `http://localhost:4001/api/users/applyleave/${_id}`,
          leaveData
        );
        setLeaveRequests([...leaveRequests, data]);
        console.log("Leave applied successfully:", data);
        setLeaveDate("");
      } catch (error) {
        console.error("Error applying leave:", error);
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
        <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>
        <form onSubmit={handleSubmitLeave} className="mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="leaveDate"
            >
              Select Date
            </label>
            <input
              type="date"
              id="leaveDate"
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
              min={minDate}
              max={maxDate}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Apply Leave
          </button>
        </form>
        <h3 className="text-xl font-semibold mb-2">Leave Requests</h3>
        <ul className="list-disc pl-5">
          {leaveRequests.map((request, index) => (
            <li key={index} className="mb-2">
              {request.date} - {request.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MarkLeave;
