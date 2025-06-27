export const LEVELS = [
  { id: 1, cardCount: 12, starCost: 0 },
  { id: 2, cardCount: 24, starCost: 3 },
  { id: 3, cardCount: 36, starCost: 5 },
  { id: 4, cardCount: 48, starCost: 7 },
  { id: 5, cardCount: 60, starCost: 10 },
  { id: 6, cardCount: 72, starCost: 12 },
  { id: 7, cardCount: 96, starCost: 15 },
] as const;
export const CARD_COUNTS = LEVELS.map((l) => l.cardCount);
export type LevelData = (typeof LEVELS)[number];
export type LevelId = (typeof LEVELS)[number]["id"];
export type CardCount = (typeof LEVELS)[number]["cardCount"];
