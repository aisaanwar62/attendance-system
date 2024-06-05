import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newName, setNewName] = useState("");
  const [newuserId, setNewuserId] = useState("");

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/admin/viewallattendance"
        );
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };
    fetchAttendanceData();
  }, []);

  const handleEditAttendance = (record) => {
    setEditing(record._id);
    setNewStatus(record.status);
  };

  const handleSaveAttendance = async (record) => {
    const updatedRecord = { ...record, status: newStatus };
    try {
      await axios.patch(
        `http://localhost:4001/api/admin/editattendance/${record._id}`,
        updatedRecord
      );
      setAttendanceData((prevData) =>
        prevData.map((item) => (item._id === record._id ? updatedRecord : item))
      );
      setEditing(null);
    } catch (error) {
      console.error("Error updating attendance record:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setNewStatus("");
  };

  const handleDeleteAttendance = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4001/api/admin/deleteattendance/${id}`
      );
      setAttendanceData((prevData) =>
        prevData.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting attendance record:", error);
    }
  };

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    const newRecord = {
      userId: newuserId, // Replace with actual user ID
      name: newName,
      date: newDate,
      status: newStatus,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/admin/addattendance",
        newRecord
      );
      setAttendanceData((prevData) => [...prevData, data.newAttendance]);
      setNewName("");
      setNewDate("");
      setNewStatus("");
    } catch (error) {
      console.error("Error adding attendance record:", error);
    }
  };

  return (
    <div className="bg-gray-400 p-8">
      <h2>Manage Attendance</h2>
      <form onSubmit={handleAddAttendance} className="mb-4">
        <div className="space-y-4 ">
          <div className="flex space-x-1">
            <label>UserId:</label>
            <input
              type="text"
              value={newuserId}
              onChange={(e) => setNewuserId(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          <div className="flex space-x-1">
            <label>Name:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          <div className="flex space-x-2">
            <label>Date: </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          <div className="flex space-x-1">
            <label>Status:</label>
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-1 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add Attendance
          </button>
        </div>
      </form>
      <ul className="flex flex-col items-center justify-center">
        {attendanceData.map((record) => (
          <li key={record._id} className="mb-2">
            {record.name}-{"("}
            {record.date}
            {")"}-{""}
            {editing === record._id ? (
              <input
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="border p-1"
              />
            ) : (
              record.status
            )}
            {editing === record._id ? (
              <>
                <button
                  onClick={() => handleSaveAttendance(record)}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEditAttendance(record)}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAttendance(record._id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAttendance;
