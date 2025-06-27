import { useCurrentLevelDispatch } from "@/context/level.context";
import { getStarsObtained, getTopScore, getTotalStars, useScores } from "@/context/scores.context";
import type { LevelData } from "@/lib/levels";
import { LockIcon, PlayIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router";

type LevelCardProps = LevelData;

function LevelCard({
  id,
  cardCount,
  starCost,
}: LevelCardProps) {
  const currentLevelDispatch = useCurrentLevelDispatch();
  const navigate = useNavigate();
  const scores = useScores();

  const topScore = getTopScore(scores, id);
  const starsObtained = getStarsObtained(scores, id);
  const totalStars = getTotalStars(scores);
  
  const isLocked = totalStars < starCost;

  const onPlayButtonClick = () => {
    currentLevelDispatch(id);
    navigate("play");
  }

  return (
    <div
      className={`p-6 flex flex-col gap-1 rounded-lg bg-base-300 shadow-sm ${
        isLocked ? "opacity-50" : ""
      }`}
    >
      <h2 className="text-3xl font-bold">
        {cardCount} <span className="text-base">Cards</span>
      </h2>

      {isLocked ? (
        <>
          <div></div>
          <div>
            <h3 className="text-xs text-base-content">Unlocks at</h3>
            <p className="flex items-center gap-1 text-xl font-bold">
              {starCost} <StarIcon size={16} />
            </p>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center gap-3">
          <div className="flex">
            {new Array(3).fill(0).map((_, index) => (
              <StarIcon
                key={index.toString()}
                size={24}
                fill={
                  index < starsObtained ? "var(--color-warning)" : "transparent"
                }
                className="text-warning/50"
              />
            ))}
          </div>
          <div className="flex flex-col items-end place-self-end">
            <h3 className="text-xs text-base-content/50">Top Score</h3>
            <p className="text-xl font-bold">{topScore ? topScore : "-"}</p>
          </div>
        </div>
      )}

      {isLocked ? (
        <button className="btn btn-primary w-full" disabled>
          <LockIcon size={16} />
        </button>
      ) : (
        <button onClick={onPlayButtonClick} className="btn btn-primary w-full">
          <PlayIcon size={16} fill="var(--color-base-content)" />
        </button>
      )}
    </div>
  );
}

export default LevelCard;
