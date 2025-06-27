import { useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
    ScoresContext,
    ScoresDispatchContext,
    type Score,
    type ScoresAction,
} from "./scores.context";

function scoresReducer(state: Score[], action: ScoresAction): Score[] {
  switch (action.type) {
    case "add_score":
      return [...state, action.payload];
    case "clear_scores":
      return [];
    default:
      return state;
  }
}

export function ScoresProvider({ children }: { children: React.ReactNode }) {
  const [persistedScores, setPersistedScores] = useLocalStorage<Score[]>(
    "scores",
    []
  );
  const [scores, dispatch] = useReducer(scoresReducer, persistedScores);

  useEffect(() => {
    setPersistedScores(scores);
  }, [scores, setPersistedScores]);

  return (
    <ScoresContext value={scores}>
      <ScoresDispatchContext value={dispatch}>
        {children}
      </ScoresDispatchContext>
    </ScoresContext>
  );
}
