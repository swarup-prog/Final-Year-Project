import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector } from "react-redux";

import { Dashboard, Login, Signup } from "./pages";

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <div>
      <Toaster theme={isDarkMode ? "dark" : "light"} richColors={true} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
