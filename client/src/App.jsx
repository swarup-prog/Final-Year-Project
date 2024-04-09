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
  GameSelection,
  UserApp,
  Home,
  Profile,
  Buddies,
  Discover,
  Community,
  Notifications,
  Messages,
} from "./pages";
import { useEffect, useState } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";

import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import { fetchGames } from "./features/game/gameSlice";
import { adminRoutes, userRoutes } from "./routes";
import axios from "axios";

function App() {
  initializeApp();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch();
  const userToken = localStorage.getItem("session-token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

  //
  const user = useSelector((state) => state.user.data);

  const loginNavigate = () => {
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role != "admin" && user.interestedGames.length >= 1) {
      console.log("app", user.interestedGames.length);
      navigate("/app");
    } else {
      navigate("/interestedGameSelection");
    }
  };

  useEffect(() => {
    if (userToken) {
      const userId = jwtDecode(userToken)._id;
      dispatch(fetchUserData(userId));
      dispatch(fetchGames());
    } else {
      navigate("/login");
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    if (user) {
      user.role === "admin"
        ? navigate("/admin/dashboard")
        : user.role != "admin" && user.interestedGames.length >= 1
        ? navigate("/app/home")
        : navigate("/gameSelection");
    }
  }, [user]);

  return (
    <div>
      <Toaster theme={isDarkMode ? "dark" : "light"} richColors={true} />
      <Routes>
        <Route caseSensitive={true} path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<PrivateRoutes role={"admin"} />}>
          <Route path="/admin" element={<Admin />}>
            {adminRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Route>
        </Route>
        <Route element={<PrivateRoutes role={"user"} />}>
          <Route path="/app" element={<UserApp />}>
            {userRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Route>
          <Route path="/gameSelection" element={<GameSelection />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
