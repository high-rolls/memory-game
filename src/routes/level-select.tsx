import LevelCard from "@/components/level-card";
import type { LevelData } from "@/lib/types";

const INITIAL_LEVELS: LevelData[] = [
  { cardCount: 12, starsObtained: 0, starCost: 0 },
  { cardCount: 24, starsObtained: 0, starCost: 3 },
  { cardCount: 36, starsObtained: 0, starCost: 5 },
  { cardCount: 48, starsObtained: 0, starCost: 7 },
  { cardCount: 60, starsObtained: 0, starCost: 10 },
  { cardCount: 72, starsObtained: 0, starCost: 12 },
  { cardCount: 96, starsObtained: 0, starCost: 15 },
];

function LevelSelect() {
  const levels = INITIAL_LEVELS;

  const starCount = levels.reduce(
    (acc, level) => (acc += level.starsObtained),
    0
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 max-h-full w-full overflow-y-auto gap-3 p-3">
      {levels.map((level) => (
        <LevelCard {...level} isLocked={starCount < level.starCost} />
      ))}
    </div>
  );
}

export default LevelSelect;
