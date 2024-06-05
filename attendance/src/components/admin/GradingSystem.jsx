import React, { useState } from "react";
import axios from "axios";

function AttendanceReport() {
  const [reportData, setReportData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4001/api/admin/gradesettings?from=${dateRange.from}&to=${dateRange.to}`
      );
      setReportData(data.report);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="m-20 bg-gray-300 flex- flex-col items-center justify-center ">
      <h2 className="text-xl font-bold mb-4">Grading system report</h2>
      <div className="mb-4">
        <label className="block mb-2">From Date:</label>
        <input
          type="date"
          name="from"
          value={dateRange.from}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">To Date:</label>
        <input
          type="date"
          name="to"
          value={dateRange.to}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleGenerateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Report
      </button>
      {reportData.length > 0 && (
        <ul className="mt-4">
          {reportData.map((record, index) => (
            <li key={index} className="mb-2">
              User: {record.fullName} - Attended Days: {record.attendedDays} -
              Grade: {record.grade}
            </li>
          ))}
        </ul>
      )}
      {reportData.length === 0 && (
        <p className="mt-4 text-gray-500">
          No data available for the selected date range.
        </p>
      )}
    </div>
  );
}

function AdminPanel() {
  return (
    <div>
      <AttendanceReport />
    </div>
  );
}

export default AdminPanel;
