import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Signup } from "../pages";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (userData) => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        {userData && userData.role === "admin" && (
          <Route exact path="/dashboard" element={<Dashboard />} />
        )}
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
