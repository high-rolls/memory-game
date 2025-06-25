export type CardCount = number;

export type CardData = {
  id: number;
  emoji: string;
  isFaceUp: boolean;
  isMatched: boolean;
  isPowerCard: boolean;
  timesSeen: number;
};

export type LevelData = {
  cardCount: CardCount;
  starsObtained: number;
  starCost: number;
  topScore?: number;
};

export type LevelDataActions = {
  setCardCount: (cardCount: CardCount) => void;
  setStarsObtained: (starsObtained: number) => void;
  setStarCost: (starCost: number) => void;
  setTopScore: (topScore: number) => void;
}

export type WindowSize = {
  width: number;
  height: number;
};

