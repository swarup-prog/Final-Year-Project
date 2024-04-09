import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserRole } from "../services";

const PrivateRoutes = ({ role }) => {
  const token = localStorage.getItem("session-token");
  const userRole = getUserRole(token);
  const isAuthenticated = token ? true : false;

  return isAuthenticated && role === userRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
