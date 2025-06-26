export const CARD_COUNTS = [12, 24, 36, 48, 60, 72, 84, 96] as const;
export type CardCount = (typeof CARD_COUNTS)[number];

export type CardData = {
  id: number;
  emoji: string;
  isFaceUp: boolean;
  isMatched: boolean;
  isPowerCard: boolean;
  timesSeen: number;
};

export type LevelData = {
  id: number;
  cardCount: CardCount;
  starsObtained: number;
  starCost: number;
  topScore?: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

