import { useState } from "react";

import { AuthContext } from "./AuthContext";

export const AuthProvider = (props) => {
  const [admin, setAdmin] = useState(null);

  const value = {
    admin,
    setAdmin,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
