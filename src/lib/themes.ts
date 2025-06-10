import type { IconTheme } from "@/lib/types";

export const themeEmojis = {
  animals: ["🐁", "🦉", "🦥", "🐎", "🦖", "🐓", "🦐", "🦋"],
  fruits: ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍌", "🍍"],
};

export const getEmojisForTheme = (theme: IconTheme) => {
  return themeEmojis[theme as keyof typeof themeEmojis] || themeEmojis.animals;
};

export const getEmojiForTheme = (theme: IconTheme, value: number) => {
  if (value < 0 || value > 16) {
    throw new Error("Invalid card value.");
  }
  return getEmojisForTheme(theme)[value];
}