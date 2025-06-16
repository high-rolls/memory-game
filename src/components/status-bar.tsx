export interface IStatusBarProps {
  gameState: "initial" | "displaying-cards" | "playing" | "win";
  matchCount: number;
}

function StatusBar({ gameState, matchCount }: IStatusBarProps) {
  let title;
  switch (gameState) {
    case "initial":
      title = "Press Play to start";
      break;
    case "displaying-cards":
      title = "Get Ready...";
      break;
    case "playing":
      title = `${matchCount > 0 ? matchCount : "No"} match${
        matchCount !== 1 ? "es" : ""
      }`;
      break;
    case "win":
      title = "You've won!";
      break;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">{title}</h1>
    </div>
  );
}

export default StatusBar;
