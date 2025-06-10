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

export function getEmojisForTheme(theme: IconTheme) {
  return themeEmojis[theme as keyof typeof themeEmojis] || themeEmojis.animals;
};

export function getEmojiForTheme(theme: IconTheme, value: number) {
  if (value < 0 || value > 16) {
    throw new Error("Invalid card value.");
  }
  return getEmojisForTheme(theme)[value];
};

export function getRandomEmojisInTheme(theme: IconTheme, length: number) {
  const allEmojis = getEmojisForTheme(theme);
  if (length > allEmojis.length) {
    throw new Error("Provided length is greater than the number of emoji in theme.");
  }
  const shuffled = shuffleArray(allEmojis);
  return shuffled.slice(0, length);
};
