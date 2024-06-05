import React, { useState } from "react";
import axios from "axios";

function GenerateReport() {
  const [reportData, setReportData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4001/api/admin/generatereport?from=${dateRange.from}&to=${dateRange.to}`
      );
      setReportData(data);
      setError(null);
    } catch (error) {
      console.error("Error generating report:", error);
      setReportData([]);
      setError("Error generating report. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-200 p-20">
      <h2 className="text-xl font-bold mb-4">Generate Report</h2>
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
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {reportData.length > 0 ? (
        <ul className="mt-4">
          {reportData.map((record, index) => (
            <li
              key={index}
              className="mb-2 flex flex-col items-center justify-center bg-gray-100 p-2 rounded"
            >
              <h1 className="font-bold">Report</h1>
              <h1> User ID: {record.userId}</h1>
              <h1> Date: {record.date}</h1>
              <h1> Status: {record.status}</h1>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">
          No data available for the selected date range.
        </p>
      )}
    </div>
  );
}

export default GenerateReport;
