import { GamepadIcon, MedalIcon, PlaySquareIcon, SettingsIcon } from "lucide-react";
import { NavLink } from "react-router";

export function BottomDock() {
  return (
    <div className="dock dock-xs md:hidden bg-base-200">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "dock-active" : undefined)}
      >
        <PlaySquareIcon size={20} />
        <span className="dock-label">Levels</span>
      </NavLink>

      <NavLink
        to="/scores"
        className={({ isActive }) => (isActive ? "dock-active" : undefined)}
      >
        <MedalIcon size={20} />
        <span className="dock-label">Scores</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? "dock-active" : undefined)}
      >
        <SettingsIcon size={20} />
        <span className="dock-label">Settings</span>
      </NavLink>
    </div>
  );
}
