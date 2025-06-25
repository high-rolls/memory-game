export type CardColor = "amber" | "emerald" | "purple";
export type IconTheme =
  | "activities"
  | "animals"
  | "flags"
  | "food-and-drink"
  | "objects"
  | "people-and-body"
  | "smileys-and-emotion";

type Settings = {
  cardColor: CardColor;
  iconTheme: IconTheme;
  soundVolume: number;
};

type SettingsActions = {
  setCardColor: (color: CardColor) => void;
  setIconTheme: (theme: IconTheme) => void;
  setSoundVolume: (volume: number) => void;
};

export type { Settings, SettingsActions };
