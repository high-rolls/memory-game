import type { IconTheme } from "@/lib/types";
import { shuffleArray } from "./utils";

export const themeEmojis = {
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🐔",
  ],
  fruits: [
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
  ],
};

export function getEmojisForTheme(theme: IconTheme, length: number) {
  const emojis = themeEmojis[theme as keyof typeof themeEmojis] || themeEmojis.animals;
  return emojis.slice(0, length);
};

export function getRandomEmojisInTheme(theme: IconTheme, length: number) {
  const allEmojis = getEmojisForTheme(theme, length);
  if (length > allEmojis.length) {
    throw new Error("Provided length is greater than the number of emoji in theme.");
  }
  const shuffled = shuffleArray(allEmojis);
  return shuffled.slice(0, length);
};
