import LevelCard from "@/components/level-card";
import { LevelsContext } from "@/context/levels.context";
import { use } from "react";

function LevelSelect() {
  const levels = use(LevelsContext);

  const starCount = levels.reduce(
    (acc, level) => (acc += level.starsObtained),
    0
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 max-h-full w-full overflow-y-auto gap-3 p-3">
      {levels.map((level) => (
        <LevelCard
          key={level.id}
          {...level}
          isLocked={starCount < level.starCost}
        />
      ))}
    </div>
  );
}

export default LevelSelect;
