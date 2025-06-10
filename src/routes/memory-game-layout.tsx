// src/routes/MemoryGameLayout.tsx
import { Outlet } from "react-router";
import { GameSettingsProvider } from "@/context/game-settings-context";

export default function MemoryGameLayout() {
  return (
    <GameSettingsProvider>
      <Outlet />
    </GameSettingsProvider>
  );
}
