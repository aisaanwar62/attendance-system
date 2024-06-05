import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageLeaves() {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/admin/getallleaverequests"
        );
        setLeaveRequests(response.data.leaveRequests);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:4001/api/admin/updateleavestatus/${requestId}`,
        { status }
      );
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? response.data : request
        )
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <div className="m-20 bg-gray-300 flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Manage Leave Requests</h2>
      <ul className="list-disc pl-5">
        {leaveRequests.map((request) => (
          <li
            key={request._id}
            className="mb-2 flex items-center justify-center"
          >
            {request.userId.fullName} -{" "}
            {new Date(request.date).toLocaleDateString()} -{" "}
            <h1 className="text-blue-500">{request.status}</h1>
            <button
              onClick={() => handleUpdateStatus(request._id, "approved")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleUpdateStatus(request._id, "rejected")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageLeaves;
