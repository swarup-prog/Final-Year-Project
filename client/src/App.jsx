import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "./features/auth/authSlice";

import {
  Admin,
  Error,
  Login,
  Signup,
  Dashboard,
  AdminGames,
  AdminNews,
  Users,
} from "./pages";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";

import checkAuth from "./app/auth";
import initializeApp from "./app/init";

initializeApp();
const token = checkAuth();

function App() {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const pathsWithoutNavbar = ["/login", "/signup"];
  const [navbarVisible, setNavbarVisible] = useState(true);

  const dispatch = useDispatch();
  const userToken = localStorage.getItem("session-token");

  useEffect(() => {
    const path = location.pathname;
    setNavbarVisible(!pathsWithoutNavbar.includes(path));
  }, [location.pathname]);

  const user = useSelector((state) => state.user.data);

  const loginNavigate = () => {
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/app");
    }
  };

  useEffect(() => {
    if (userToken) {
      const userId = jwtDecode(userToken)._id;
      dispatch(fetchUserData(userId));
    } else {
      navigate("/login");
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    if (user) {
      user.role === "admin" ? navigate("/admin/dashboard") : navigate("/home");
    }
  }, [user]);

  return (
    <div>
      <Toaster theme={isDarkMode ? "dark" : "light"} richColors={true} />
      <Routes>
        <Route caseSensitive={true} path="/login" element={<Login />} />

        <Route exact path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/games" element={<AdminGames />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
