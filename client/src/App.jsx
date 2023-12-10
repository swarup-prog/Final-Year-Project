import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserData } from "./features/auth/authSlice";

import { Dashboard, Login, Signup } from "./pages";
import { useEffect, useState } from "react";
import { SideNavigation, Header } from "./components";

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
  console.log(user);

  useEffect(() => {
    if (user) {
      user.role === "admin" ? navigate("/dashboard") : navigate("/home");
    } else {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (userToken) {
      const userId = jwtDecode(userToken)._id;
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userToken]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster theme={isDarkMode ? "dark" : "light"} richColors={true} />
      {navbarVisible && <Header />}
      <div className="flex h-[804px]">
        {navbarVisible && (
          <div className="w-fit bg-gray-200">
            <SideNavigation />
          </div>
        )}
        <div className="flex-grow-1 p-4 ">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
