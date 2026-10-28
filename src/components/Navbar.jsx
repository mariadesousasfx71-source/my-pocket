import { NavLink } from "react-router-dom";
import LogoBadge from "./LogoBadge";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/transactions", label: "Transactions" },
  { to: "/add", label: "Add" },
  { to: "/reports", label: "Reports" },
  { to: "/settings", label: "Settings" },
];

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "font-semibold text-white border-b-2 border-[#D4AF37] pb-1"
      : "text-amber-100 hover:text-white pb-1";

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-8 py-5 bg-[#3B2416] border-b-4 border-[#C9A227] shadow-lg">
      <NavLink to="/" className="flex items-center gap-4">
        <LogoBadge size={68} />
        <span className="font-brand text-4xl sm:text-5xl text-amber-50">My Pocket</span>
      </NavLink>

      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-7 text-base sm:text-lg">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} className={linkStyle}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
