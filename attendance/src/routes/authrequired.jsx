import { Navigate, Outlet, useLocation } from "react-router-dom";

function AuthRequired() {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  // Redirect to login page if token is not present
  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Render Outlet to allow access to protected routes
  return <Outlet />;
}

export default AuthRequired;
