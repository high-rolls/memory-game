import {
  getStarsObtained,
  getTopScore,
  useScores,
} from "@/context/scores.context";
import { LEVELS, type LevelId } from "@/lib/levels";
import { ListIcon, PlayIcon, RefreshCwIcon, StarIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

export interface IWinModalProps {
  isOpen: boolean;
  levelId: LevelId;
  score: number;
  onNextLevelClick: () => void;
  onReplayClick: () => void;
}

export function WinModal({
  isOpen,
  levelId,
  score,
  onNextLevelClick,
  onReplayClick,
}: IWinModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const scores = useScores();

  const stars = getStarsObtained(scores, levelId);
  const topScore = getTopScore(scores, levelId);
  const level = LEVELS.find((l) => l.id === levelId);
  const nextLevel = LEVELS.find((l) => l.id === levelId + 1);

  if (!level) throw new Error("Level not found with ID: " + levelId);

  const maxScore = level.cardCount * 100;
  const scoreForStar = maxScore * 0.25;
  const nextStar = Math.min(3, stars + 1);
  const nextStarThreshold = scoreForStar * nextStar;
  const neededForNextStar = Math.max(
    0,
    Math.ceil(nextStarThreshold - topScore)
  );

  useEffect(() => {
    if (ref.current) {
      if (isOpen && !ref.current.open) {
        ref.current.showModal();
      } else if (!isOpen && ref.current.open) {
        ref.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box text-center">
        <h2 className="text-2xl mb-4">Level Complete!</h2>
        <div className="flex justify-center gap-6 mb-4">
          <div>
            <p className="text-sm text-base-content/80">Your Score</p>
            <h3 className="text-4xl font-bold">{score}</h3>
          </div>
          <div>
            <p className="text-sm text-base-content/80">Top Score</p>
            <h3 className="text-4xl font-bold">{topScore}</h3>
          </div>
        </div>

        {score > topScore && (
          <p className="text-success font-semibold mb-2">🎉 New High Score!</p>
        )}
        <h3 className="flex justify-center mb-2">
          {Array.from({ length: 3 }, (_, i) => (
            <StarIcon
              key={i}
              size={32}
              fill={i < stars ? "var(--color-warning)" : ""}
              strokeWidth={1}
            />
          ))}
        </h3>
        {stars < 3 && (
          <p className="text-sm mb-4">
            Score {neededForNextStar} more for the next star
          </p>
        )}
        <div className="modal-action justify-between">
          <Link to="/" className="btn btn-neutral">
            <ListIcon size={16} /> Levels
          </Link>
          <button
            className="btn btn-square btn-ghost"
            onClick={onReplayClick}
            title="Replay"
          >
            <RefreshCwIcon size={18} />
          </button>
          {nextLevel && (
            <button
              className="btn btn-primary"
              onClick={onNextLevelClick}
            >
              <PlayIcon size={16} /> Next Level
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
