import { Link, NavLink, Outlet } from "react-router";
import { SettingsProvider } from "@/context/settings.provider";
import { GamepadIcon, MedalIcon, PlayIcon, SettingsIcon } from "lucide-react";
import { GlobalToolBar } from "@/components/global-tool-bar";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <div className="hidden md:navbar bg-base-200 shadow-sm">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            memoji
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
                <PlayIcon size={16} /> Play
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
      <div className="fixed top-0 md:top-16 right-0 bottom-12 md:bottom-0 left-0">
        <Outlet />
      </div>
      <div className="dock dock-xs md:hidden bg-base-200">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "dock-active" : undefined)}
        >
          <GamepadIcon size={20} />
          <span className="dock-label">Game</span>
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
      <div className="fixed top-0 right-0">
        <GlobalToolBar />
      </div>
    </SettingsProvider>
  );
}
