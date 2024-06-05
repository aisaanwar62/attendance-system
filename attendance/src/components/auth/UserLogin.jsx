import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Formik } from "formik";
import * as Yup from "yup";
import Sidebar from "../../userlayout/sidebar";
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string().required("Enter Password"),
});
function UserLogin() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const handleLogin = async (values, setSubmitting) => {
    try {
      const { email, password } = values;

      const { data } = await axios.post(
        "http://localhost:4001/api/users/login",
        values
      );
      console.log(data.message);
      console.log(data.isExisted._id);
      localStorage.setItem("authToken", email);
      navigate("/user-dashboard", { state: { _id: data.isExisted._id } });
    } catch (error) {
      console.log("error", error.message);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex fex-col items-center justify-center  h-screen bg-green-200">
      <div className="grid grid-cols-2 divide-x-2 bg-white border border-white shadow-xl rounded-lg overflow-hidden ">
        <div
          className="h-full  flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url('/userlogin.jpg')",
            backgroundSize: "contain", // Adjust this property as needed(contain,cover,fill,100% etc.)
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", // Ensure the image is not repeated
          }}
        ></div>
        {/* <div className=" flex items-center justify-center">
        <img className=" min-h-sceen" src="card.jpg" alt="Image 3" />
      </div> */}

        <div className="p-12 flex flex-col items-center justify-center bg-green-100">
          <h1 className="font-bold text-green-700 text-center ">Login</h1>
          <Formik
            initialValues={{
              email: "",

              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              setFormValues(values);
              setTimeout(() => {
                handleLogin(values, setSubmitting);
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full px-20 pt-10 space-y-4 "
              >
                <div className=" flex items-center">
                  <label className="w-1/2">LoginID: </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your LoginID/email"
                    className="border rounded shadow-md p-1 w-auto"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-400">{errors.email}</div>
                  ) : null}
                </div>
                <div className=" flex items-center">
                  <label className="w-1/2">Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="border rounded shadow-md p-1 w-full"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-400">{errors.password}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border rounded bg-green-200 shadow-md text-center px-2 py-2  flex items-center justify-center "
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                  ) : null}
                  {isSubmitting ? "Login in process..." : "login"}
                </button>
                <p>
                  Don't have an account?
                  <Link to="/register" className="text-blue-500">
                    click here
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default UserLogin;
