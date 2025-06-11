export type CardCount = 8 | 12 | 16;

export type CardData = {
  id: number;
  value: number;
  isFaceUp: boolean;
  isMatched: boolean;
};

export type IconTheme =
  | "activities"
  | "animals"
  | "drinks"
  | "flags"
  | "foods"
  | "objects"
  | "people-and-body";

export type WindowSize = {
  width: number;
  height: number;
};
