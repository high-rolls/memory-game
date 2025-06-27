import { Outlet } from "react-router";
import { SettingsProvider } from "@/context/settings.provider";
import { GlobalToolBar } from "@/components/global-tool-bar";
import { TopNav } from "./top-nav";
import { BottomDock } from "./bottom-dock";
import { CurrentLevelProvider } from "@/context/level";
import { ScoresProvider } from "@/context/scores.provider";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <ScoresProvider>
        <CurrentLevelProvider>
          <TopNav />
          <div className="fixed top-0 md:top-16 right-0 bottom-12 md:bottom-0 left-0">
            <Outlet />
          </div>
          <BottomDock />
          <div className="fixed top-0 right-0">
            <GlobalToolBar />
          </div>
        </CurrentLevelProvider>
      </ScoresProvider>
    </SettingsProvider>
  );
}
