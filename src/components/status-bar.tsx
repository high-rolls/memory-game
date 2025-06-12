import { Play, Settings } from "lucide-react";
import { useNavigate } from "react-router";

export interface IStatusBarProps {
  gameState: "initial" | "displaying-cards" | "playing" | "win";
  matchCount: number;
  onNewGameButtonClick: () => void;
}

function StatusBar({
  gameState,
  matchCount,
  onNewGameButtonClick,
}: IStatusBarProps) {
  const navigate = useNavigate();

  const handleMainMenuButtonClick = () => {
    navigate("/memory-game/");
  };

  return (
    <div className="flex mt-3 w-full flex-col items-center">
      {gameState === "initial" && (
        <StatusBarMenuButtons
          onMainMenuButtonClick={handleMainMenuButtonClick}
          onNewGameButtonClick={onNewGameButtonClick}
        />
      )}
      {gameState === "displaying-cards" && (
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
          Get Ready...
        </h1>
      )}
      {gameState === "playing" && (
        <h1 className="text-3xl sm:text-5xl text-gray-100 font-light">
          {matchCount === 0 ? (
            "No"
          ) : (
            <span className="font-bold">{matchCount}</span>
          )}{" "}
          match
          {matchCount !== 1 && "es"}
        </h1>
      )}
      {gameState === "win" && (
        <div className="flex justify-between items-center gap-3 w-full">
          <h1 className="text-2xl sm:text-4xl font-bold text-lime-100">
            You've won!
          </h1>
          <StatusBarMenuButtons
            onMainMenuButtonClick={handleMainMenuButtonClick}
            onNewGameButtonClick={onNewGameButtonClick}
          />
        </div>
      )}
    </div>
  );
}

export interface IStatusBarMenuButtonsProps {
  onMainMenuButtonClick: () => void;
  onNewGameButtonClick: () => void;
}

const StatusBarMenuButtons = ({
  onMainMenuButtonClick,
  onNewGameButtonClick,
}: IStatusBarMenuButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <button
        className="btn btn-sm sm:btn-lg btn-ghost"
        onClick={onMainMenuButtonClick}
      >
        <Settings size={16} /> Settings
      </button>
      <button
        className="btn btn-sm sm:btn-lg btn-success"
        onClick={onNewGameButtonClick}
      >
        <Play size={16} /> New Game
      </button>
    </div>
  );
};

export default StatusBar;
