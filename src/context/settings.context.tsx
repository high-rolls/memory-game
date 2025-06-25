import { createContext, type Dispatch } from "react";
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
