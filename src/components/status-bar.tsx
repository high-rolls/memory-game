import { useEffect, useRef } from "react";

export interface IStatusBarProps {
  gameState: "initial" | "displaying-cards" | "playing" | "win";
  matchCount: number;
  score: number;
  displaySeconds: number;
}

function StatusBar({
  gameState,
  matchCount,
  score,
  displaySeconds,
}: IStatusBarProps) {
  const countdownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (countdownRef.current) {
      const timerSeconds = displaySeconds.toString();
      countdownRef.current.style.setProperty("--value", timerSeconds);
      //countdownRef.current.textContent = timerSeconds;
    }
  }, [displaySeconds]);

  let title;
  switch (gameState) {
    case "initial":
      title = "Press Play to start";
      break;
    case "displaying-cards":
      title = (
        <>
          {"Get Ready... "}
          <span className="countdown">
            <span aria-live="polite" ref={countdownRef}></span>
          </span>
        </>
      );
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
    <div className="flex flex-col md:flex-row w-full justify-center md:justify-evenly items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-base-content">
        {title}
      </h1>
      {(gameState === "playing" || gameState === "win") && (
        <h1 className="text-3xl sm:text-5xl font-bold text-base-content">
          Score: {Math.floor(score)}
        </h1>
      )}
    </div>
  );
}

export default StatusBar;
