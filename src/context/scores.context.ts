import { createContext, use, type Dispatch } from "react";
import type { IconThemeId } from "./settings.context";
import { LEVELS, type LevelId } from "@/lib/levels";

export type Score = {
  levelId: LevelId;
  score: number;
  iconThemeId: IconThemeId;
  date: Date;
};

export type ScoresAction =
  | { type: "add_score"; payload: Score }
  | { type: "clear_scores" };

export const ScoresContext = createContext<Score[] | null>(null);
export const ScoresDispatchContext =
  createContext<Dispatch<ScoresAction> | null>(null);

export function useScores() {
  const context = use(ScoresContext);
  if (!context) throw new Error("Missing ScoresProvider");
  return context;
}

export function useScoresDispatch() {
  const context = use(ScoresDispatchContext);
  if (!context) throw new Error("Missing ScoresProvider");
  return context;
}

export function getTopScore(scores: Score[], levelId: LevelId) {
  const levelScores = scores.filter((s) => s.levelId === levelId);
  if (!levelScores) return 0;
  return levelScores.reduce(
    (prev: number, curr: Score) => (curr.score > prev ? curr.score : prev),
    0
  );
}

export function getStarsObtained(scores: Score[], levelId: LevelId) {
  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) return 0;
  const topScore = getTopScore(scores, levelId);
  const maxScore = level.cardCount * 100;
  const scoreForStar = maxScore * 0.25;
  return Math.min(3, Math.floor(topScore / scoreForStar));
}

export function getTotalStars(scores: Score[]) {
  return LEVELS.reduce(
    (acc, level) => acc + getStarsObtained(scores, level.id),
    0
  );
}
