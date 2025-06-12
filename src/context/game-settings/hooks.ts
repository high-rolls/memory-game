import { useContext } from "react";
import { GameSettingsActionsContext, GameSettingsContext } from "./context";
import type { GameSettings, GameSettingsActions } from "./types";

export function useGameSettings(): GameSettings {
  const context = useContext(GameSettingsContext);
  if (!context) throw new Error("Missing GameSettingsProvider");
  return context;
}

export function useGameSettingsActions(): GameSettingsActions {
  const context = useContext(GameSettingsActionsContext);
  if (!context) throw new Error("Missing GameSettingsProvider");
  return context;
}

export function useGameSettingsFull() {
  return {
    ...useGameSettings(),
    ...useGameSettingsActions(),
  };
}
