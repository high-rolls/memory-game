import {
  useState,
  type ReactNode,
} from "react";
import { LEVELS, type LevelId } from "@/lib/levels";
import { CurrentLevelContext, CurrentLevelDispatchContext } from "./level.context";

export function CurrentLevelProvider({ children }: { children: ReactNode }) {
  const [currentLevelId, setCurrentLevelId] = useState<LevelId>(LEVELS[0].id);
  const currentLevel = LEVELS.find((level) => level.id === currentLevelId)!;

  return (
    <CurrentLevelContext value={currentLevel}>
      <CurrentLevelDispatchContext value={setCurrentLevelId}>
        {children}
      </CurrentLevelDispatchContext>
    </CurrentLevelContext>
  );
}
