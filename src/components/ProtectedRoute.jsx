import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Guards every page inside it. If nobody is logged in, it sends you to
// /login and remembers the page you wanted, so you return there afterwards.
function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Logged in: show whichever page matches the address
  return <Outlet />;
}

export default ProtectedRoute;
