import { createContext, type Dispatch } from "react";
import { useContext } from "react";

export const CARD_COLORS = ["amber", "emerald", "purple"] as const;
export type CardColor = (typeof CARD_COLORS)[number];

export const ICON_THEMES = [
  "activities",
  "animals",
  "flags",
  "food-and-drink",
  "objects",
  "people-and-body",
  "smileys-and-emotion",
] as const;
export type IconTheme = (typeof ICON_THEMES)[number];

export type Settings = {
  cardColor: CardColor;
  iconTheme: IconTheme;
  soundVolume: number;
};

export type SettingsAction =
  | { type: "set_card_color"; payload: CardColor }
  | { type: "set_icon_theme"; payload: IconTheme }
  | { type: "set_sound_volume"; payload: number };

export const defaultSettings: Settings = {
  cardColor: "amber",
  iconTheme: "animals",
  soundVolume: 1,
};

export const SettingsContext = createContext<Settings | null>(null);

export const SettingsDispatchContext =
  createContext<Dispatch<SettingsAction> | null>(null);

export function useSettings(): Settings {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("Missing <SettingsProvider>");
  return context;
}

export function useSettingsDispatch(): Dispatch<SettingsAction> {
  const context = useContext(SettingsDispatchContext);
  if (!context) throw new Error("Missing <SettingsProvider>");
  return context;
}
