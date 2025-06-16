import { useGameSettings } from "@/context/game-settings";
import type { CardData } from "@/lib/types";
import { motion, useAnimation } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";

type CardProps = CardData & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const colorThemes = {
  amber: {
    borderColor: "border-amber-700",
    bgColor: "from-amber-500 to-amber-600",
    faceColor: "#fde68a",
  },
  emerald: {
    borderColor: "border-emerald-700",
    bgColor: "from-emerald-500 to-emerald-600",
    faceColor: "#a7f3d0",
  },
  purple: {
    borderColor: "border-purple-700",
    bgColor: "from-purple-500 to-purple-600",
    faceColor: "#e9d5ff",
  },
};

const Card = ({
  value,
  isFaceUp,
  isMatched,
  isPowerCard,
  onClick,
}: CardProps) => {
  const [isFaceVisible, setIsFaceVisible] = useState(isFaceUp);
  const [fontSize, setFontSize] = useState(16);
  const { cardColor, icons } = useGameSettings();
  const cardRef = useRef<HTMLDivElement>(null);
  const emoji = icons[value];
  const controls = useAnimation();

  const { borderColor, bgColor, faceColor } = useMemo(() => {
    if (isMatched && isPowerCard)
      return { ...colorThemes[cardColor], borderColor: "border-teal-200" };
    return colorThemes[cardColor];
  }, [cardColor, isMatched, isPowerCard]);

  // Scales the emoji font size based on the dynamic viewport height
  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.clientHeight;
      setFontSize(height * 0.7);
    }
  }, [cardRef.current?.clientHeight]);

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
      style={{ fontSize: fontSize }}
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
            className={`card-face backface-hidden ${borderColor}`}
            animate={{
              backgroundColor: isMatched
                ? isPowerCard
                  ? "#06b6d4"
                  : "#bbf451"
                : faceColor,
            }}
          >
            <motion.span animate={controls} initial={{ scale: 1 }}>
              {isFaceVisible && emoji}
            </motion.span>
          </motion.div>

          {/* Back Face */}
          <div
            className={`card-face rotate-y-180 backface-hidden ${borderColor} bg-gradient-to-br ${bgColor}`}
          />
        </motion.div>
      </button>
    </div>
  );
};

export default Card;
