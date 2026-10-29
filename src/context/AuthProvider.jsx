import AuthContext from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";

// A simple "fake" login: no password and no server, just a name.
// The name is saved in localStorage, so you stay logged in after a refresh.
function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  function login(name) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
