import { Navigate } from "react-router-dom";

function HomeRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role === "user") {
    return <Navigate to="/user" replace />;
  }

  if (role === "store-owner") {
    return <Navigate to="/store-owner" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default HomeRedirect;