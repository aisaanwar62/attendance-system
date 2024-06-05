import { Navigate, Outlet, useLocation } from "react-router-dom";

function UserRequired() {
  const location = useLocation();
  const token = localStorage.getItem("userToken");

  // Redirect to login page if token is not present
  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Render Outlet to allow access to protected routes
  return <Outlet />;
}

export default UserRequired;
