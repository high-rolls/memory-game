import BoardPreview from "@/components/board-preview";
import { useCurrentLevelDispatch } from "@/context/level.context";
import {
  getStarsObtained,
  getTopScore,
  getTotalStars,
  useScores,
} from "@/context/scores.context";
import type { LevelData } from "@/lib/levels";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router";

type LevelCardProps = LevelData;

function LevelCard({ id, cardCount, starCost }: LevelCardProps) {
  const currentLevelDispatch = useCurrentLevelDispatch();
  const navigate = useNavigate();
  const scores = useScores();

  const topScore = getTopScore(scores, id);
  const starsObtained = getStarsObtained(scores, id);
  const totalStars = getTotalStars(scores);

  const isLocked = totalStars < starCost;

  const handleClick = () => {
    currentLevelDispatch(id);
    navigate("play");
  };

  return (
    <button
      className={`btn p-6 flex-col justify-between h-full gap-3 btn-primary`}
      onClick={handleClick}
      disabled={isLocked}
    >
      <div className="w-full flex justify-between">
        <h2 className="text-3xl font-bold">
          {cardCount} <span className="text-base font-normal">Cards</span>
        </h2>

        {isLocked ? (
          <div className="text-base-content">
            <h3 className="text-xs">Unlocks at</h3>
            <p className="flex items-center gap-1 text-xl font-bold">
              {starCost} <StarIcon size={16} />
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center place-self-end">
            <div className="flex">
              {new Array(3).fill(0).map((_, index) => (
                <StarIcon
                  key={index.toString()}
                  size={20}
                  fill={
                    index < starsObtained
                      ? "var(--color-warning)"
                      : "transparent"
                  }
                  className="text-warning/50"
                />
              ))}
            </div>
            <p className="text-2xl font-bold">{topScore ? topScore : "-"}</p>
          </div>
        )}
      </div>
      <div
        className={`flex flex-1 flex-col w-full min-h-[100px] ${
          isLocked ? "opacity-50" : ""
        }`}
      >
        <BoardPreview cardCount={cardCount} />
      </div>
      
    </button>
  );
}

export default LevelCard;
