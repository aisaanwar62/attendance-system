import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditProfile from "../components/user/EditProfile";
import MarkAttendance from "../components/user/MarkAttendance";
import ViewAttendance from "../components/user/ViewAttendance";
import MarkLeave from "../components/user/MarkLeave";

function Sidebar({ _id }) {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/users/getuser/${_id}`
        );

        setUser(data.name);
        console.log(data.picture);
        if (data.user.picture) {
          // Replace backslashes with forward slashes in the image path
          const formattedImagePath = data.user.picture.replace(/\\/g, "/");
          // Remove 'src/uploads/' from the image path
          const imagePath = formattedImagePath.replace("src/uploads/", "");
          console.log(imagePath);
          setProfilePic(`http://localhost:4001/uploads/${imagePath}`);
        }
        console.log(data.user); // Assuming picture is the property that holds the profile picture URL
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [_id]); // Dependency array

  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <div className="bg-gray-700 text-white w-64  flex justify-center overflow-y-auto">
        <div className="px-6 flex-col items-center ">
          <img
            src={profilePic} // Display profile picture
            alt="profile-pic"
            className="w-14 h-14 rounded-full cursor-pointer"
          />
          <button
            onClick={() => setActiveModal("editProfile")}
            className="block hover:text-blue-500"
          >
            <img
              src="/user-pen-solid.svg"
              alt="profile-pic"
              className="w-10 h-10 rounded-full p-2 cursor-pointer"
            />
          </button>

          <ul className="space-y-4">
            <li>
              <Link
                to="/user-dashboard"
                className="block hover:text-blue-500 mt-5"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("editProfile")}
                className="block hover:text-blue-500"
              >
                Edit Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("markleave")}
                className="block hover:text-blue-500"
              >
                Mark Leave
              </button>
            </li>

            <li>
              <button
                onClick={() => setActiveModal("markAttendance")}
                className="block hover:text-blue-500"
              >
                Mark Attendance
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveModal("viewAttendance")}
                className="block hover:text-blue-500"
              >
                View Attendance
              </button>
            </li>
          </ul>
        </div>
      </div>
      {activeModal === "editProfile" && (
        <EditProfile closeModal={closeModal} _id={_id} />
      )}
      {activeModal === "markAttendance" && (
        <MarkAttendance closeModal={closeModal} _id={_id} />
      )}
      {activeModal === "viewAttendance" && (
        <ViewAttendance closeModal={closeModal} _id={_id} />
      )}
      {activeModal === "markleave" && (
        <MarkLeave closeModal={closeModal} _id={_id} />
      )}
    </div>
  );
}

export default Sidebar;
