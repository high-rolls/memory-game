import type { GameState } from "@/routes/play";
import { useEffect, useRef } from "react";

export interface IStatusBarProps {
  displaySeconds: number;
  gameState: GameState;
  score: number;
  scoreChange: number;
}

function StatusBar({
  displaySeconds,
  gameState,
  score,
  scoreChange,
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
  let value;
  let desc;
  switch (gameState) {
    case "initial":
      title = "Press Play to start";
      break;
    case "displaying-cards":
      title = "Get Ready... ";
      value = (
        <span className="countdown">
          <span aria-live="polite" ref={countdownRef}></span>
        </span>
      );
      break;
    case "playing":
      title = "Score";
      value = Math.floor(score).toString();
      if (scoreChange > 0) desc = `↗︎ ${Math.floor(scoreChange)}`;
      break;
    case "win":
      title = "You've won!";
      value = Math.floor(score).toString();
      desc = "Final Score";
      break;
  }

  return (
    <div className="stats shadow">
      <div className="stat p-0 place-items-center">
        {title && <div className="stat-title">{title}</div>}
        {value && <div className="stat-value text-lime-300">{value}</div>}
        {desc && <div className="stat-desc text-lime-300">{desc}</div>}
      </div>
    </div>
  );
}

export default StatusBar;
