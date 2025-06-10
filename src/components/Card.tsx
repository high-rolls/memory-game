import { useContext } from "react";
import type { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { IconThemeContext } from "@/context/icon-theme-context";
import type { CardData } from "@/lib/types";
import { getEmojisForTheme } from "@/lib/themes";

type CardProps = CardData & {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ value, isFaceUp, isMatched, onClick }: CardProps) => {
  const { iconTheme } = useContext(IconThemeContext);
  const themeEmojis = getEmojisForTheme(iconTheme);
  const emoji = themeEmojis[value];

  return (
    <div className="perspective w-[64px] h-[64px] sm:w-[96px] sm:h-[96px] 2xl:w-[128px] 2xl:h-[128px]">
      <button
        onClick={onClick}
        className="relative w-full h-full"
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFaceUp ? 0 : 180 }}
          initial={{ rotateY: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Front Face */}
          <div
            className={`card-face backface-hidden bg-gradient-to-br ${
              isMatched ? "from-lime-300 to-lime-400" : "from-amber-100 to-amber-200"
            }`}
          >
            {emoji}
          </div>

          {/* Back Face */}
          <div className="card-face rotate-y-180 backface-hidden bg-gradient-to-br from-amber-500 to-amber-600" />
        </motion.div>
      </button>
    </div>
  );
};

export default Card;
