import { createContext, useContext } from "react";

export const AuthContext = createContext({
  admin: null,
  setAdmin: (admin) => {},
});

export const useAuth = () => useContext(AuthContext);
