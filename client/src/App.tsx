import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Login, Signup } from "./pages";
import { Toaster } from "sonner";

import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const isDarkMode: boolean = useSelector(
    (state: RootState) => state.theme.isDarkMode
  );

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
