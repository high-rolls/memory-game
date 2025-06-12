export type IconTheme =
  | "activities"
  | "animals"
  | "drinks"
  | "flags"
  | "foods"
  | "objects"
  | "people-and-body";

export type CardCount = 8 | 12 | 16 | 20 | 24 | 28 | 32;

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
