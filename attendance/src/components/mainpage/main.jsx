import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="grid grid-cols-2 divide-x-2  ">
      <div className=" flex flex-col items-center justify-center  text-center space-y-20">
        <h1 className="text-4xl text-green-700 font-bold ">
          Welcome to the Attendance System
        </h1>
        <div className="space-x-4 mt-20">
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            User Registration
          </Link>
          <Link
            to="/UserLogin"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Student Login
          </Link>
          <Link
            to="/AdminLogin"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Admin Login
          </Link>
        </div>
      </div>
      <div
        className="min-h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('/attendance.jpg')",
          backgroundSize: "contain", // Adjust this property as needed(contain,cover,fill,100% etc.)
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", // Ensure the image is not repeated
        }}
      ></div>
    </div>
  );
}

export default Main;
