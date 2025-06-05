import { type MouseEventHandler } from "react";
import type { CardData } from "../types";

const icons = ["🐁", "🦉", "🦥", "🐎", "🦖", "🐓", "🦐", "🦋"];

type CardProps = CardData & {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Card = ({ value, flipped, matched, onClick }: CardProps) => {
  return (
    <button
      className={`w-[64px] h-[64px] sm:w-[96px] sm:h-[96px] 2xl:w-[128px] 2xl:h-[128px] flex justify-center items-center 
        rounded-md text-5xl sm:text-8xl ${
          flipped ? "bg-amber-100" : matched ? "bg-lime-300" : "bg-amber-600"
        }`}
      onClick={onClick}
    >
      {(flipped || matched) && icons[value]}
    </button>
  );
};

export default Card;
