import "./App.css";
import SideNavigation from "./components/SideNavigation";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
