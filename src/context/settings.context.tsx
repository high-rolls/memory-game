import { createContext } from "react";
import { useContext } from "react";

export type CardColor = "amber" | "emerald" | "purple";
export type IconTheme =
  | "activities"
  | "animals"
  | "flags"
  | "food-and-drink"
  | "objects"
  | "people-and-body"
  | "smileys-and-emotion";

export type Settings = {
  cardColor: CardColor;
  iconTheme: IconTheme;
  soundVolume: number;
};

export type SettingsActions = {
  setCardColor: (color: CardColor) => void;
  setIconTheme: (theme: IconTheme) => void;
  setSoundVolume: (volume: number) => void;
};

export const SettingsContext = createContext<Settings | null>(null);
export const SettingsActionsContext = createContext<SettingsActions | null>(null);

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
