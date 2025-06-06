import type { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import type { CardData } from "../types";

type CardProps = CardData & {
  emoji: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ isFaceUp, isMatched, emoji, onClick }: CardProps) => {
  return (
    <div className="perspective w-[64px] h-[64px] sm:w-[96px] sm:h-[96px] 2xl:w-[128px] 2xl:h-[128px]">
      <button
        onClick={onClick}
        className="relative w-full h-full"
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFaceUp ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Front Face */}
          <div
            className={`card-face backface-hidden ${
              isMatched ? "bg-lime-300" : "bg-amber-100"
            }`}
          >
            {emoji}
          </div>

          {/* Back Face */}
          <div className="card-face rotate-y-180 backface-hidden bg-amber-600" />
        </motion.div>
      </button>
    </div>
  );
};

export default Card;
