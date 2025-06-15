// src/routes/MemoryGameLayout.tsx
import { NavLink, Outlet } from "react-router";
import { GameSettingsProvider } from "@/context/game-settings";
import { GamepadIcon, SettingsIcon } from "lucide-react";

export default function MemoryGameLayout() {
  return (
    <GameSettingsProvider>
      <div className="fixed top-0 right-0 bottom-16 left-0">
        <Outlet />
      </div>
      <div className="dock">
        <NavLink
          to="/play"
          className={({ isActive }) => (isActive ? "dock-active" : undefined)}
        >
          <GamepadIcon size={20} />
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "dock-active" : undefined)}
        >
          <SettingsIcon size={20} />
        </NavLink>
      </div>
    </GameSettingsProvider>
  );
}
