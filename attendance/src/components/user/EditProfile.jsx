import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function EditProfile({ closeModal, _id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("picture", values.picture);

    try {
      const { data } = await axios.patch(
        `http://localhost:4001/api/users/editpicture/${_id}`,
        formData
      );
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setIsSubmitting(false);
    setSubmitting(false);
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
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {/* Modal content */}
        <Formik initialValues={{ picture: null }} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center space-x-2">
                <label
                  htmlFor="picture"
                  className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
                >
                  Picture
                </label>
                <input
                  className="bg-gray-50 border w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  type="file"
                  name="picture"
                  onChange={(event) => {
                    setFieldValue("picture", event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                ) : null}
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditProfile;
