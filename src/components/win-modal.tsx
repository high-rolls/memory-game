import {
  getStarsObtained,
  getTopScore,
  useScores,
} from "@/context/scores.context";
import { LEVELS, type LevelId } from "@/lib/levels";
import { ListIcon, PlayIcon, RefreshCwIcon, StarIcon } from "lucide-react";
import { useRef } from "react";
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

  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) throw new Error("Level not found with ID: " + levelId);

  // Level scores, sorted by date descending
  const levelScores = scores
    .filter((score) => score.levelId === levelId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isFirstScore = levelScores.length === 1;

  const currentStars = getStarsObtained(levelScores, levelId);
  const currentTopScore = getTopScore(scores);

  const previousScores = levelScores.slice(1);
  const prevStars = getStarsObtained(previousScores, levelId);
  const prevTopScore = getTopScore(previousScores);

  const nextLevel = LEVELS.find((l) => l.id === levelId + 1);

  const maxScore = level.cardCount * 100;
  const scorePerStar = maxScore * 0.25;

  const nextStar = Math.min(3, currentStars + 1);
  const nextStarThreshold = scorePerStar * nextStar;
  const currentStarThreshold = scorePerStar * currentStars;

  const progressValue = Math.max(currentTopScore - currentStarThreshold, 0);
  const progressMax = nextStarThreshold - currentStarThreshold;

  return (
    <dialog ref={ref} open={isOpen} className="modal">
      <div className="modal-box text-center">
        <h2 className="text-2xl mb-4">Level Complete!</h2>
        <div className="flex justify-center gap-6 mb-4">
          <div>
            <p className="text-sm text-base-content/80">Score</p>
            <h3 className="text-4xl font-bold">{score}</h3>
          </div>
          {!isFirstScore && (
            <div>
              <p className="text-sm text-base-content/80">Top Score</p>
              <h3 className="text-4xl font-bold">{currentTopScore}</h3>
            </div>
          )}
        </div>

        {score > prevTopScore && (
          <p className="text-success font-semibold mb-2">🎉 New High Score!</p>
        )}
        <h3 className="flex justify-center mb-2">
          {Array.from({ length: 3 }, (_, i) => (
            <StarIcon
              key={i}
              size={32}
              fill={i < currentStars ? "var(--color-warning)" : ""}
              className={
                i >= prevStars && i < currentStars ? "animate-bounce" : ""
              }
              strokeWidth={1}
            />
          ))}
        </h3>
        {currentStars < 3 && (
          <div className="flex justify-center items-center gap-3">
            <span className="text-sm text-primary-content/80">
              {currentStarThreshold}
            </span>
            <progress
              className="progress w-30"
              value={progressValue}
              max={progressMax}
            ></progress>
            <span className="font-semibold">{nextStarThreshold}</span>
          </div>
        )}
        <div className="modal-action flex-col justify-around">
          <Link to="/" className="btn btn-soft">
            <ListIcon size={16} /> Back to Levels
          </Link>
          <button
            className="btn btn-soft"
            onClick={onReplayClick}
            title="Replay"
          >
            <RefreshCwIcon size={18} /> Replay
          </button>
          {nextLevel && (
            <button className="btn btn-primary" onClick={onNextLevelClick}>
              <PlayIcon size={16} /> Next Level
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
