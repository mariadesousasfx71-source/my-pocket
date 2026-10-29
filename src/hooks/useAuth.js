import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Custom hook: gives any component the logged-in user, login() and logout()
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}

export default useAuth;
