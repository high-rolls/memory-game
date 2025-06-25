export type CardColor = "amber" | "emerald" | "purple";
export type IconTheme =
  | "activities"
  | "animals"
  | "flags"
  | "food-and-drink"
  | "objects"
  | "people-and-body"
  | "smileys-and-emotion";

type GameSettings = {
  cardColor: CardColor;
  iconTheme: IconTheme;
  soundVolume: number;
};

type GameSettingsActions = {
  setCardColor: (color: CardColor) => void;
  setIconTheme: (theme: IconTheme) => void;
  setSoundVolume: (volume: number) => void;
};

export type { GameSettings, GameSettingsActions };
