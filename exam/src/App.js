import { Route, Routes } from "react-router-dom";

// Importing screens
import { Home } from "./Screen/Home.jsx";
import { Login } from "./Screen/Login.jsx";
import { AdminDashboard } from "./Screen/AdminDashboard/AdminDashboard.jsx";
import { Index } from "./Screen/Devotee/index.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/devotee" element={<Index />} />
    </Routes>
  );
}

export default App;
