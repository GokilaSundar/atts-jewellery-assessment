import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./AuthContext";

function ProtectedRoute() {
  const { admin, setAdmin } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/me")
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error("Failed to authenticate user!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-80 font-semibold text-2xl items-center">
        Loading...
      </div>
    );
  }

  return admin ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
