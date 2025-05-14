import "./App.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NoPage from "./components/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
