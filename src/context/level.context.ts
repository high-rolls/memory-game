import { LEVELS, type LevelData, type LevelId } from "@/lib/levels";
import type { Dispatch, SetStateAction } from "react";
import { createContext, use } from "react";

export const CurrentLevelContext = createContext<LevelData>(LEVELS[0]);
export const CurrentLevelDispatchContext = createContext<Dispatch<
  SetStateAction<LevelId>
> | null>(null);

export function useCurrentLevel() {
  const currentLevel = use(CurrentLevelContext);
  if (!currentLevel) throw new Error("Missing CurrentLevelContext");
  return currentLevel;
}

export function useCurrentLevelDispatch() {
  const currentLevelDispatch = use(CurrentLevelDispatchContext);
  if (!currentLevelDispatch)
    throw new Error("Missing CurrentLevelDispatchContext");
  return currentLevelDispatch;
}
