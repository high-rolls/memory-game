import type { GameState } from "@/routes/play";
import { PlayIcon, ScanEyeIcon } from "lucide-react";
import { useState } from "react";

export interface IActionBarMenuButtonsProps {
  gameState: GameState;
  revealAbilityCount: number;
  onNewGameButtonClick: () => void;
  onRevealAllButtonClick: () => void;
}

const ActionBar = ({
  gameState,
  revealAbilityCount,
  onNewGameButtonClick,
  onRevealAllButtonClick,
}: IActionBarMenuButtonsProps) => {
  const [prevRevealAbilityCount, setPrevRevealAbilityCount] =
    useState(revealAbilityCount);
  const [scaleClass, setScaleClass] = useState("scale-100");

  if (prevRevealAbilityCount !== revealAbilityCount) {
    setPrevRevealAbilityCount(revealAbilityCount);
    if (revealAbilityCount > prevRevealAbilityCount) {
      setScaleClass("scale-125");
      setTimeout(() => {
        setScaleClass("scale-100");
      }, 300);
    }
  }

  return (
    <div className="flex flex-row gap-2">
      {(gameState === "initial" || gameState === "win") && (
        <button
          className="btn btn-lg btn-success"
          onClick={onNewGameButtonClick}
        >
          <PlayIcon size={16} /> Play{gameState === "win" && " Again"}
        </button>
      )}
      {(gameState === "playing" || gameState === "displaying-cards") && (
        <button
          className={`btn btn-lg btn-info disabled:scale-90 transition-all ${scaleClass}`}
          onClick={onRevealAllButtonClick}
          disabled={gameState === "displaying-cards" || revealAbilityCount <= 0}
        >
          <ScanEyeIcon size={24} /> Reveal All{" "}
          <div className="badge badge-lg">{revealAbilityCount}</div>
        </button>
      )}
    </div>
  );
};

export default ActionBar;
