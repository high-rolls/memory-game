import { useGameSettings } from "@/context/game-settings";
import { useWindowSize } from "@/lib/hooks";
import type { CardData } from "@/lib/types";
import { motion } from "framer-motion";
import { useRef, type MouseEventHandler } from "react";

type CardProps = CardData & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ value, isFaceUp, isMatched, onClick }: CardProps) => {
  const { icons } = useGameSettings();
  const cardRef = useRef<HTMLDivElement>(null);
  const emoji = icons[value];
  const windowSize = useWindowSize();

  const relativeCardHeight = cardRef.current
    ? cardRef.current.clientHeight / windowSize.height
    : 0.1;

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
        >
          {/* Front Face */}
          <div
            ref={cardRef}
            className={`card-face backface-hidden bg-gradient-to-br ${
              isMatched
                ? "from-lime-300 to-lime-400"
                : "from-amber-100 to-amber-200"
            }`}
          >
            {isFaceUp ? emoji : ""}
          </div>

          {/* Back Face */}
          <div className="card-face rotate-y-180 backface-hidden bg-gradient-to-br from-amber-500 to-amber-600" />
        </motion.div>
      </button>
    </div>
  );
};

export default Card;
