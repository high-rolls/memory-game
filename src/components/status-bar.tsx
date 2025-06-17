import type { GameState } from "@/routes/play";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const [displayScore, setDisplayScore] = useState(score);
  const countdownRef = useRef<HTMLSpanElement>(null);
  const prevScoreRef = useRef(score);
  const descAnimation = useAnimation();
  const valueAnimation = useAnimation();

  useEffect(() => {
    if (countdownRef.current) {
      const timerSeconds = displaySeconds.toString();
      countdownRef.current.style.setProperty("--value", timerSeconds);
      //countdownRef.current.textContent = timerSeconds;
    }
  }, [displaySeconds]);

  useEffect(() => {
    const prevScore = prevScoreRef.current;
    const scoreHasChanged = score !== prevScore;

    if (gameState === "playing" && score > 0 && scoreHasChanged) {
      console.log(gameState, score);
      descAnimation.start({
        scale: [1, 1.5, 1], // Scale up then down
        rotateX: ["90deg", "0deg", "-90deg"],
        translateY: ["16px", "0px", "-32px"],
        transition: {
          duration: 1,
          ease: "easeInOut",
          times: [0, 0.5, 1], // Timing for each keyframe
        },
      });
      valueAnimation.start({
        scale: [1, 1, 1.5, 1],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 0.67, 1], // Timing for each keyframe
        },
      });
      setTimeout(() => setDisplayScore(score), 800);
    }

    prevScoreRef.current = score;
  }, [descAnimation, valueAnimation, gameState, score]);

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
      value = Math.floor(displayScore).toString();
      desc = scoreChange > 0 ? `+${Math.floor(scoreChange)}` : "";
      break;
    case "win":
      title = "You've won!";
      value = Math.floor(score).toString();
      desc = "Final Score";
      break;
  }

  return (
    <div className="stats shadow">
      <div className="stat p-0 px-6 h-full overflow-clip place-items-center">
        {title && <div className="stat-title">{title}</div>}
        <motion.div
          className="stat-value text-lime-300"
          animate={valueAnimation}
        >
          {value}
        </motion.div>
        <motion.div className="stat-desc text-lime-300" animate={descAnimation}>
          {desc}
        </motion.div>
      </div>
    </div>
  );
}

export default StatusBar;
