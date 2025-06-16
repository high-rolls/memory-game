import type { GameState } from "@/routes/play";
import { PlayIcon, ScanEyeIcon } from "lucide-react";

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
  return (
    <div className="flex flex-row gap-2">
      {gameState === "initial" && (
        <button
          className="btn btn-lg btn-success"
          onClick={onNewGameButtonClick}
        >
          <PlayIcon size={16} /> Play
        </button>
      )}
      {(gameState === "playing" || gameState === "displaying-cards") && (
        <button
          className="btn btn-lg btn-info"
          onClick={onRevealAllButtonClick}
          disabled={
            revealAbilityCount === 0 || gameState === "displaying-cards"
          }
        >
          <ScanEyeIcon size={24} /> Reveal All ({revealAbilityCount})
        </button>
      )}
    </div>
  );
};

export default ActionBar;
