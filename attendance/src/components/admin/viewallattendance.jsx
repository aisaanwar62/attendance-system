import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminViewAllAttendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4001/api/admin/viewallattendance"
      );
      console.log("Attendance fetched successfully:", data);

      // Check if response.data.attendance is an array
      if (Array.isArray(data)) {
        setAttendanceList(data);
        setError(null);
      } else {
        setAttendanceList([]);
        setError("Invalid data format received");
      }
    } catch (error) {
      console.error(
        "Error viewing attendance:",
        error.response?.data?.message || error.message
      );
      setAttendanceList([]);
      setError(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className=" flex items-center justify-center  h-full">
      <div className="bg-gray-500 p-10 rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold mb-4">View All Attendance Records</h2>
        <div>
          <h3 className="text-xl font-semibold mb-2">Attendance List</h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="list-disc pl-5">
              {attendanceList && attendanceList.length > 0 ? (
                attendanceList.map((record, recordIndex) => (
                  <li key={recordIndex} className="mb-2">
                    <strong>
                      {record._id} - {record.name} (
                      {new Date(record.date).toLocaleDateString()}) -{" "}
                      {record.status}
                    </strong>
                  </li>
                ))
              ) : (
                <li>No attendance records found.</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminViewAllAttendance;
