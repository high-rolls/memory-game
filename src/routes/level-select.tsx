import LevelCard from "@/components/level-card";
import { getTotalStars, useScores } from "@/context/scores.context";
import { LEVELS } from "@/lib/levels";
import { StarIcon } from "lucide-react";

const levels = LEVELS;

function LevelSelect() {
  const scores = useScores();
  const totalStars = getTotalStars(scores);
  return (
    <div className="flex flex-col h-full max-h-full">
      <h1 className="flex p-3 gap-2 bg-base-200 text-3xl justify-center items-center">
        <StarIcon
          size={24}
          className="text-warning"
          fill="var(--color-warning)"
        />
        {totalStars}
      </h1>
      <div className="grid flex-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-auto gap-3 p-3">
        {levels.map((level) => { return (
          <LevelCard
            key={level.id}
            {...level}
          />
        )})}
      </div>
    </div>
  );
}

export default LevelSelect;
