import { createContext } from "react";
import type { GameSettings, GameSettingsActions } from "./types";

export const GameSettingsContext = createContext<GameSettings | null>(null);
export const GameSettingsActionsContext =
  createContext<GameSettingsActions | null>(null);
