import { useContext } from "react";
import { SettingsActionsContext, SettingsContext } from "./context";
import type { Settings, SettingsActions } from "./types";

export function useSettings(): Settings {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("Missing SettingsProvider");
  return context;
}

export function useSettingsActions(): SettingsActions {
  const context = useContext(SettingsActionsContext);
  if (!context) throw new Error("Missing SettingsProvider");
  return context;
}

export function useSettingsFull() {
  return {
    ...useSettings(),
    ...useSettingsActions(),
  };
}
