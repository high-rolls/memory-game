import { useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  defaultLevels,
  LevelsContext,
  LevelsDispatchContext,
  type LevelData,
  type LevelsAction,
} from "./levels.context";

function levelsReducer(state: LevelData[], action: LevelsAction): LevelData[] {
  switch (action.type) {
    case "set_top_score": {
      const { levelId, score } = action.payload;
      // Updates the top score only if the new score is larger than it
      return state.map((level) =>
        level.id === levelId && (!level.topScore || score > level.topScore)
          ? { ...level, topScore: score }
          : level
      );
    }
    case "set_stars_obtained": {
      const { levelId, stars } = action.payload;
      return state.map((level) =>
        level.id === levelId && stars > level.starsObtained
          ? { ...level, starsObtained: Math.min(3, stars) }
          : level
      );
    }
    default:
      return state;
  }
}

export function Levels({ children }: { children: React.ReactNode }) {
  const [persistedLevels, setPersistedLevels] = useLocalStorage<LevelData[]>(
    "levels",
    defaultLevels
  );

  const [levels, levelsDispatch] = useReducer(levelsReducer, persistedLevels);

  useEffect(() => {
    setPersistedLevels(levels);
  }, [levels, setPersistedLevels]);

  return (
    <LevelsContext value={levels}>
      <LevelsDispatchContext value={levelsDispatch}>
        {children}
      </LevelsDispatchContext>
    </LevelsContext>
  );
}
