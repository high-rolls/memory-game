import type { CardCount } from "@/lib/types";
import { createContext, type Dispatch } from "react";

export type LevelData = {
  id: number;
  cardCount: CardCount;
  starsObtained: number;
  starCost: number;
  topScore?: number;
};

export const defaultLevels: LevelData[] = [
  { id: 1, cardCount: 12, starsObtained: 0, starCost: 0 },
  { id: 2, cardCount: 24, starsObtained: 0, starCost: 3 },
  { id: 3, cardCount: 36, starsObtained: 0, starCost: 5 },
  { id: 4, cardCount: 48, starsObtained: 0, starCost: 7 },
  { id: 5, cardCount: 60, starsObtained: 0, starCost: 10 },
  { id: 6, cardCount: 72, starsObtained: 0, starCost: 12 },
  { id: 7, cardCount: 96, starsObtained: 0, starCost: 15 },
];
export type LevelId = (typeof defaultLevels)[number]["id"];

export const LevelsContext = createContext<LevelData[]>(defaultLevels);
export const LevelsDispatchContext =
  createContext<Dispatch<LevelsAction> | null>(null);

export const CurrentLevelContext = createContext<LevelId>(1);
export const CurrentLevelDispatchContext =
  createContext<Dispatch<CurrentLevelAction> | null>(null);

export type LevelsAction =
  | {
      type: "set_top_score";
      payload: { levelId: LevelId; score: number };
    }
  | {
      type: "set_stars_obtained";
      payload: {
        levelId: LevelId;
        stars: 0 | 1 | 2 | 3;
      };
    };

export type CurrentLevelAction = {
  type: "set_current_level";
  payload: LevelId;
};
