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
  hideMatched: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const colorThemes = {
  amber: {
    backColor: "from-amber-500 to-amber-600",
    borderColor: "border-amber-700",
    faceColor: "bg-amber-200",
  },
  emerald: {
    backColor: "from-emerald-500 to-emerald-600",
    borderColor: "border-emerald-700",
    faceColor: "bg-emerald-200",
  },
  purple: {
    backColor: "from-purple-500 to-purple-600",
    borderColor: "border-purple-700",
    faceColor: "bg-purple-200",
  },
};

const Card = ({
  emoji,
  isFaceUp,
  isMatched,
  isPowerCard,
  hideMatched,
  onClick,
}: CardProps) => {
  const [isFaceVisible, setIsFaceVisible] = useState(isFaceUp);
  const [fontSize, setFontSize] = useState(16);
  const { cardColor } = useGameSettings();
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const { borderColor, backColor, faceColor } = useMemo(() => {
    if (isMatched && isPowerCard)
      return {
        ...colorThemes[cardColor],
        faceColor: "bg-info",
        borderColor: "border-info",
      };
    return colorThemes[cardColor];
  }, [cardColor, isMatched, isPowerCard]);

  // Transition immediately when not hiding matched
  const transitionOpacity = hideMatched ? "transition-opacity delay-600 duration-300" : "";
  const opacity = isMatched && hideMatched ? "opacity-25" : "opacity-100";

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
    <div className={`perspective aspect-square w-full h-full ${transitionOpacity} ${opacity}`}>
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
            className={`card-face backface-hidden ${faceColor} ${borderColor}`}
          >
            <motion.span
              animate={controls}
              initial={{ scale: 1 }}
              style={{ fontSize: fontSize }}
            >
              {isFaceVisible && emoji}
            </motion.span>
          </motion.div>

          {/* Back Face */}
          <div
            className={`card-face rotate-y-180 backface-hidden bg-linear-to-br ${backColor} ${borderColor}`}
          />
        </motion.div>
      </button>
    </div>
  );
};

export default Card;
