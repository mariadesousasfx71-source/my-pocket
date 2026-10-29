import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import LogoBadge from "../components/LogoBadge";
import useAuth from "../hooks/useAuth";
import { inputStyle } from "../utils/styles";

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // The page you were trying to open before being sent here (or the Dashboard)
  const goTo = location.state?.from || "/";

  // Already logged in? Skip the login page.
  if (user) return <Navigate to={goTo} replace />;

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Please enter your name.");
      return;
    }
    login(name.trim());
    navigate(goTo, { replace: true });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm p-8">
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-center space-y-4">
          <LogoBadge size={110} />
          <h1 className="font-brand text-5xl text-[#3B2416]">My Pocket</h1>
          <p className="text-[#9A5A2C] font-semibold">Every rupee, in one place.</p>

          <label className="block w-full text-left">
            <span className="text-sm text-stone-600">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maria"
              autoFocus
              className={`mt-1 ${inputStyle}`}
            />
          </label>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#3B2416] hover:bg-[#2A190F] text-amber-50 border border-[#24150C] shadow-md hover:shadow-lg transition font-semibold rounded-lg py-2"
          >
            Enter My Pocket
          </button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
