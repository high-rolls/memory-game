// src/routes/MemoryGameLayout.tsx
import { Outlet } from "react-router";
import { GameSettingsProvider } from "@/context/game-settings";

export default function MemoryGameLayout() {
  return (
    <GameSettingsProvider>
      <Outlet />
    </GameSettingsProvider>
  );
}
