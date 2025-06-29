import { MedalIcon, PlaySquareIcon, SettingsIcon } from "lucide-react";
import { Link, NavLink } from "react-router";

export function TopNav() {
  return (
    <div className="hidden md:navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Memoji
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal gap-1 px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu-active" : undefined
              }
            >
              <PlaySquareIcon size={16} /> Levels
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/scores"
              className={({ isActive }) =>
                isActive ? "menu-active" : undefined
              }
            >
              <MedalIcon size={16} /> Scores
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? "menu-active" : undefined
              }
            >
              <SettingsIcon size={16} /> Settings
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
