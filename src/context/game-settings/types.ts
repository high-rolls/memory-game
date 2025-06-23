export type CardColor = "amber" | "emerald" | "purple";
export type CardCount = number;
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
  cardCount: CardCount;
  iconTheme: IconTheme;
  soundVolume: number;
};

type GameSettingsActions = {
  setCardColor: (color: CardColor) => void;
  setCardCount: (count: CardCount) => void;
  setIconTheme: (theme: IconTheme) => void;
  setSoundVolume: (volume: number) => void;
};

export type { GameSettings, GameSettingsActions };
