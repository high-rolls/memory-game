import { createContext, type Dispatch } from "react";
import { useContext } from "react";

export const CARD_COLORS = ["amber", "emerald", "purple"] as const;
export type CardColor = (typeof CARD_COLORS)[number];

export const ICON_THEMES = [
  { id: "activities", emoji: "⚽", label: "Activities" },
  { id: "animals", emoji: "🐸", label: "Animals" },
  { id: "flags", emoji: "🚩", label: "Flags" },
  { id: "food-and-drink", emoji: "🍎", label: "Food & Drink" },
  { id: "objects", emoji: "💍", label: "Objects" },
  { id: "people-and-body", emoji: "👀", label: "People & Body" },
  { id: "smileys-and-emotion", emoji: "😎", label: "Smileys & Emotion" },
] as const;

export type IconThemeId = (typeof ICON_THEMES)[number]["id"];

export type Settings = {
  cardColor: CardColor;
  iconThemeId: IconThemeId;
  soundVolume: number;
};

export type SettingsAction =
  | { type: "set_card_color"; payload: CardColor }
  | { type: "set_icon_theme_id"; payload: IconThemeId }
  | { type: "set_sound_volume"; payload: number };

export const defaultSettings: Settings = {
  cardColor: "amber",
  iconThemeId: "animals",
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
