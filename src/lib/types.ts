export type CardCount = 8 | 12 | 16;

export type CardData = {
  id: number;
  value: number;
  isFaceUp: boolean;
  isMatched: boolean;
};

export type IconTheme = "animals" | "fruits";

export type WindowSize = {
    width: number;
    height: number;
}