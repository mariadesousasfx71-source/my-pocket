import { NavLink } from "react-router-dom";
import LogoBadge from "./LogoBadge";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "font-semibold text-white border-b-2 border-amber-300 pb-1"
      : "text-amber-100 hover:text-white pb-1";

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-8 py-5 bg-[#4A2C1A] shadow-lg">
      <NavLink to="/" className="flex items-center gap-4">
        <LogoBadge size={68} />
        <span className="font-brand text-4xl sm:text-5xl text-amber-50">
          My Pocket
        </span>
      </NavLink>

      <div className="flex gap-6 sm:gap-8 text-base sm:text-lg">
        <NavLink to="/" end className={linkStyle}>Dashboard</NavLink>
        <NavLink to="/expenses" className={linkStyle}>Expenses</NavLink>
        <NavLink to="/add" className={linkStyle}>Add</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
