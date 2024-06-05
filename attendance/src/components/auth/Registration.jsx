import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  loginId: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short!").required("Required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  picture: Yup.mixed().required("Required"),
});

function Registration() {
  const navigate = useNavigate();

  const handleSubmit = async (values, setSubmitting) => {
    const formData = new FormData();
    formData.append("loginId", values.loginId);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("picture", values.picture);
    console.log(values.picture);

    try {
      const { data } = await axios.post(
        "http://localhost:4001/api/users/register",
        formData
      );
      console.log(data.message);
      toast.success("User registered successfully");
      navigate("/UserLogin");
    } catch (errors) {
      console.log("Error", errors.message);
      toast.error("Error registering user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex fex-col items-center justify-center h-screen bg-sky-200">
      <div className="grid grid-cols-2 divide-x-2 bg-white border border-white shadow-xl rounded-lg overflow-hidden">
        <div
          className="h-full flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url('/time_attendence.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="p-7 flex flex-col items-center justify-center bg-sky-100 bg-opacity-30">
          <h1 className="font-bold text-sky-700 text-center">Sign Up</h1>
          <Formik
            initialValues={{
              loginId: "",
              email: "",
              password: "",
              ConfirmPassword: "",
              picture: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full px-7 pt-10 space-y-4"
              >
                <div className="flex items-center">
                  <label className="w-1/2">Profile Picture:</label>
                  <input
                    type="file"
                    name="picture"
                    className="border rounded shadow-md p-2 w-full"
                    onChange={(event) => {
                      setFieldValue("picture", event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.picture && touched.picture ? (
                    <div className="text-red-400">{errors.picture}</div>
                  ) : null}
                </div>
                <div className="flex items-center">
                  <label className="w-1/2">Full Name:</label>
                  <input
                    type="text"
                    name="loginId"
                    placeholder="Enter your Full Name"
                    className="border rounded shadow-md p-2 w-full"
                    value={values.loginId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.loginId && touched.loginId ? (
                    <div className="text-red-400">{errors.loginId}</div>
                  ) : null}
                </div>

                <div className="flex items-center">
                  <label className="w-1/2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="border rounded shadow-md p-2 w-full"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-400">{errors.email}</div>
                  ) : null}
                </div>

                <div className="flex items-center">
                  <label className="w-1/2">Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    className="border rounded shadow-md p-2 w-full"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-400">{errors.password}</div>
                  ) : null}
                </div>

                <div className="flex items-center">
                  <label className="w-1/2">Confirm Password:</label>
                  <input
                    type="password"
                    name="ConfirmPassword"
                    placeholder="Confirm your Password"
                    className="border rounded shadow-md p-2 w-full"
                    value={values.ConfirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.ConfirmPassword && touched.ConfirmPassword ? (
                    <div className="text-red-400">{errors.ConfirmPassword}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border rounded bg-green-200 shadow-md text-center px-2 py-2 flex items-center justify-center w-full"
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                  ) : null}
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
                <p>
                  Already have an account?{" "}
                  <Link to="/UserLogin" className="text-blue-500">
                    Log in
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

export default Registration;
