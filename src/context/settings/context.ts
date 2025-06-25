import { createContext } from "react";
import type { Settings, SettingsActions } from "./types";

export const SettingsContext = createContext<Settings | null>(null);
export const SettingsActionsContext =
  createContext<SettingsActions | null>(null);
