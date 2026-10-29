import { useState } from "react";
import AuthContext from "./AuthContext";

// A simple "fake" login: no password and no server, just a name.
//
// The name is kept in sessionStorage, not localStorage. sessionStorage is
// emptied when the tab or browser is closed, so every time you start My Pocket
// you begin logged out. A page refresh in the same tab keeps you logged in.
function loadUser() {
  try {
    return JSON.parse(sessionStorage.getItem("user"));
  } catch {
    return null;
  }
}

// Remove the old login that earlier versions saved in localStorage
localStorage.removeItem("user");

function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  function login(name) {
    const person = { name };
    sessionStorage.setItem("user", JSON.stringify(person));
    setUser(person);
  }

  function logout() {
    sessionStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
