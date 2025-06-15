export type IconTheme =
  | "activities"
  | "animals"
  | "flags"
  | "food-and-drink"
  | "objects"
  | "people-and-body"
  | "smileys-and-emotion";

export type CardCount = number;

type GameSettings = {
  iconTheme: IconTheme;
  cardCount: CardCount;
  icons: string[];
};

type GameSettingsActions = {
  setIconTheme: (theme: IconTheme) => void;
  setCardCount: (count: CardCount) => void;
  setIcons: (icons: string[]) => void;
};

export type { GameSettings, GameSettingsActions };
