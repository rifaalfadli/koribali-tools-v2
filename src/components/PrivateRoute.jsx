import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const user = localStorage.getItem("user");

  // Validasi apakah user sudah login
  let isAuthenticated = false;

  try {
    const parsedUser = JSON.parse(user || "");
    isAuthenticated = !!parsedUser?.id;
  } catch {
    isAuthenticated = false;
  }

  // Jika sudah login, render child route. Jika belum, redirect ke login
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
