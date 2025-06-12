import { useGameSettings } from "@/context/game-settings";
import { useWindowSize } from "@/lib/hooks";
import type { CardData } from "@/lib/types";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";

type CardProps = CardData & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ value, isFaceUp, isMatched, onClick }: CardProps) => {
  const [isFaceVisible, setIsFaceVisible] = useState(isFaceUp);
  const { icons } = useGameSettings();
  const cardRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const emoji = icons[value];
  const controls = useAnimation();

  const relativeCardHeight = cardRef.current
    ? cardRef.current.clientHeight / windowSize.height
    : 0.1;

  // Trigger the match animation when isMatched changes
  useEffect(() => {
    if (isMatched && isFaceVisible) {
      controls.start({
        scale: [1, 1.5, 1], // Scale up then down
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          times: [0, 0.5, 1], // Timing for each keyframe
        },
      });
    }
  }, [controls, isMatched, isFaceVisible]);

  return (
    <div
      className="perspective aspect-square w-full h-full"
      style={{ fontSize: `${relativeCardHeight * 70}vh` }}
    >
      <button onClick={onClick} className="relative w-full h-full">
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFaceUp ? 0 : 180 }}
          initial={{ rotateY: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (!isFaceUp) setIsFaceVisible(false);
          }}
          onAnimationStart={() => {
            if (isFaceUp) setIsFaceVisible(true);
          }}
        >
          {/* Front Face */}
          <motion.div
            ref={cardRef}
            className={`card-face backface-hidden`}
            animate={{
              backgroundColor: isMatched ? "#bef264" : "#fde68a",
            }}
          >
            <motion.span animate={controls} initial={{ scale: 1 }}>
              {isFaceVisible && emoji}
            </motion.span>
          </motion.div>

          {/* Back Face */}
          <div className="card-face rotate-y-180 backface-hidden bg-gradient-to-br from-amber-500 to-amber-600" />
        </motion.div>
      </button>
    </div>
  );
};

export default Card;
