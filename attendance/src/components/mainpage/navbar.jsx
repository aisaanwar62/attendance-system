import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbarmain() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("/UserLogin");
  };

  const handleAdminLogin = () => {
    navigate("/AdminLogin");
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="bg-sky-900 p-4 flex items-center justify-between fixed w-full h-20">
        <div className="flex items-center">
          <img
            src="/logoipsum-225.svg"
            alt="Logo"
            className="w-16 h-16 rounded-full p-2 cursor-pointer"
          />
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/register" className="text-white relative group">
            Register
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <div className="relative group">
            <span className="text-white cursor-pointer relative group-hover:underline">
              Login
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </span>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ul>
                <li
                  onClick={handleUserLogin}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                >
                  User Login
                </li>
                <li
                  onClick={handleAdminLogin}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                >
                  Admin Login
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
