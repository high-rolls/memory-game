import type { LevelData } from "@/lib/types";
import { LockIcon, PlayIcon, StarIcon } from "lucide-react";
import { Link } from "react-router";

type LevelCardProps = LevelData & {
  isLocked: boolean;
};

function LevelCard({
  cardCount,
  isLocked,
  starCost,
  starsObtained,
  topScore,
}: LevelCardProps) {
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

      <Link to={`/play/${cardCount}`} className="btn btn-primary w-full">
        {isLocked ? (
          <>
            <LockIcon size={16} />
          </>
        ) : (
          <>
            <PlayIcon size={16} fill="var(--color-base-content)" />
          </>
        )}
      </Link>
    </div>
  );
}

export default LevelCard;