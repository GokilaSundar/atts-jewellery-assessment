import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import JewelleryEditor from "./components/JewelleryEditor";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Navbar />}>
          <Route path="/jewellery" element={<JewelleryEditor />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
