import type { GameState } from "@/routes/play";
import { useEffect, useRef } from "react";

export interface IStatusBarProps {
  gameState: GameState;
  score: number;
  displaySeconds: number;
}

function StatusBar({ gameState, score, displaySeconds }: IStatusBarProps) {
  const countdownRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (countdownRef.current) {
      const timerSeconds = displaySeconds.toString();
      countdownRef.current.style.setProperty("--value", timerSeconds);
      //countdownRef.current.textContent = timerSeconds;
    }
  }, [displaySeconds]);

  let title;
  let subtitle;
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
      title = `Score: ${Math.floor(score)}`;
      break;
    case "win":
      title = "You've won!";
      subtitle = (
        <span>
          Score: <span className="font-bold">{Math.floor(score)}</span>
        </span>
      );
      break;
  }

  return (
    <div className="flex flex-col md:flex-row w-full justify-center md:justify-evenly items-baseline">
      <h1 className="text-3xl sm:text-5xl font-bold text-base-content">
        {title}
      </h1>
      {subtitle && (
        <h2 className="text-2xl sm:text-3xl text-base-content">{subtitle}</h2>
      )}
    </div>
  );
}

export default StatusBar;
