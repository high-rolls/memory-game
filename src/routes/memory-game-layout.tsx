// src/routes/MemoryGameLayout.tsx
import { Link, NavLink, Outlet } from "react-router";
import { GameSettingsProvider } from "@/context/game-settings";
import { GamepadIcon, SettingsIcon } from "lucide-react";

export default function MemoryGameLayout() {
  return (
    <GameSettingsProvider>
      <div className="hidden md:navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/play" className="btn btn-ghost text-xl">
            memoji
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">
                <SettingsIcon size={16} /> Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed top-0 md:top-16 right-0 bottom-12 md:bottom-0 left-0">
        <Outlet />
      </div>
      <div className="dock dock-xs md:hidden">
        <NavLink
          to="/play"
          className={({ isActive }) => (isActive ? "dock-active" : undefined)}
        >
          <GamepadIcon size={20} />
          <span className="dock-label">Game</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "dock-active" : undefined)}
        >
          <SettingsIcon size={20} />
          <span className="dock-label">Settings</span>
        </NavLink>
      </div>
    </GameSettingsProvider>
  );
}
