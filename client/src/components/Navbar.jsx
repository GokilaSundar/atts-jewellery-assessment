import axios from "axios";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "./ProtectedRoutes/AuthContext";

const Navbar = () => {
  const { setAdmin } = useAuth();
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure! you want to logout?");

    if (confirmLogout) {
      setLoggingOut(true);

      axios
        .get("/api/logout")
        .then(() => {
          setAdmin(null);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Failed to logout!", error);
          alert("Failed to logout!");
        })
        .finally(() => {
          setLoggingOut(false);
        });
    }
  };

  return (
    <>
      <div className="border font-medium bg-white p-3 flex border-white shadow-md rounded-sm justify-between">
        <div className="text-xl font-semibold text-enableButton italic">
          ATTS JEWELLERY
        </div>
        <div className="flex gap-10 text-lg">
          <button disabled={loggingOut} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
