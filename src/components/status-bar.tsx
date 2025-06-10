import { RefreshCw } from "lucide-react";

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
  return (
    <div className="flex mt-3 px-3 w-full flex-col items-center">
      {gameState === "initial" && (
        <button
          className="btn sm:btn-lg btn-success"
          onClick={onNewGameButtonClick}
        >
          <RefreshCw size={16} /> New Game
        </button>
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
        <div className="flex justify-center items-center gap-3 w-full">
          <h1 className="text-2xl sm:text-4xl font-bold text-lime-100">
            You've won!
          </h1>
          <button
            className="btn sm:btn-lg btn-success"
            onClick={onNewGameButtonClick}
          >
            <RefreshCw size={16} /> New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default StatusBar;
