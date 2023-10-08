import "./App.css";
import SideNavigation from "./components/SideNavigation";
import { Routes, Route } from "react-router-dom";
import {Login, Signup} from "./pages"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
