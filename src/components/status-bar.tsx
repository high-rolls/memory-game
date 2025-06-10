import { RefreshCw } from "lucide-react";

export interface IStatusBarProps {
  gameState: "initial" | "displaying-cards" | "playing" | "win";
  matchCount: number;
  onNewGameButtonClick: () => void;
};

function StatusBar({
  gameState,
  matchCount,
  onNewGameButtonClick,
}: IStatusBarProps) {
  return (
    <div className="mt-3 flex flex-col items-center">
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
        <h1 className="mb-3 text-3xl sm:text-5xl font-bold text-lime-100">
          You've won!
        </h1>
      )}
      {gameState === "displaying-cards" && (
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
          Get Ready...
        </h1>
      )}
      {(gameState === "initial" || gameState === "win") && (
        <button
          className="p-3 flex justify-start items-center gap-2 text-lg rounded-md font-semibold text-black bg-lime-500 hover:bg-lime-600"
          onClick={onNewGameButtonClick}
        >
          <RefreshCw color="black" size={20} /> New Game
        </button>
      )}
    </div>
  );
}

export default StatusBar;