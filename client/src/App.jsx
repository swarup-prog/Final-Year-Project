import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "./features/auth/authSlice";

import {
  Admin,
  Error,
  Login,
  Signup,
  GameSelection,
  UserApp,
  Authenticate,
} from "./pages";
import { useEffect } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";

import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import { fetchGames } from "./features/game/gameSlice";
import { adminRoutes, userRoutes } from "./routes";
import { clearActiveChat, fetchUserChats } from "./features/chat/chatSlice";
import { Spinner } from "@chakra-ui/react";
import { fetchNotifications } from "./features/notification/notificationSlice";
import { fetchLiveData } from "./features/live/liveSlice";
import { fetchNews } from "./features/news/newsSlice";

function App() {
  initializeApp();
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch();
  const userToken = checkAuth();
  console.log(userToken);

  const user = useSelector((state) => state.user.data);

  let path;
  let decodedToken;
  if (userToken) {
    decodedToken = jwtDecode(userToken);

    if (decodedToken.role === "admin") {
      path = "/admin/dashboard";
    } else {
      path = "/app/home";
      if (user && user.role !== "admin" && user.interestedGames?.length === 0) {
        console.log("length", user?.interestedGames.length);
        navigate("/gameSelection");
      }
    }
  }

  const curentPath = window.location.pathname;

  console.log("currentPath", curentPath);
  useEffect(() => {
    if (!curentPath.startsWith("/app/messages/")) {
      dispatch(clearActiveChat());
    }
  }, [curentPath]);

  useEffect(() => {
    if (userToken) {
      console.log("fetching user data");
      dispatch(fetchUserData(decodedToken._id));
      dispatch(fetchGames());
      dispatch(fetchUserChats());
      dispatch(fetchNotifications());
      dispatch(fetchLiveData());
      dispatch(fetchNews());
    }
  }, [dispatch, userToken]);

  return (
    <div>
      <Toaster theme={isDarkMode ? "dark" : "light"} richColors={true} />
      <Routes>
        <Route path="/authenticating" element={<Authenticate />} />
        <Route
          path="*"
          element={<Navigate to={userToken ? path : "/login"} replace />}
        />
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
