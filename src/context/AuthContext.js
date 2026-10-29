import { createContext } from "react";

// Holds who is logged in. AuthProvider fills it; useAuth() reads it.
const AuthContext = createContext(null);

export default AuthContext;
