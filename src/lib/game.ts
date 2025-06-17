import type { IconTheme } from "@/context/game-settings";
import type { CardData } from "@/lib/types";
import {
  getRandomEmojiInTheme,
  getRandomEmojisInTheme,
  themeEmojis,
} from "./themes";
import { shuffleArray } from "./utils";

export function createCardArray(
  iconTheme: IconTheme,
  isFaceUp: boolean,
  numPairs: number,
  numPowerPairs: number,
  isShuffled: boolean = false
): CardData[] {
  if (numPairs <= 0) {
    throw new Error("Number of pairs must be a positive number.");
  }

  const otherThemes = Object.keys(themeEmojis).filter(
    (k) => k !== iconTheme
  ) as IconTheme[];
  // Pick power icons randomly from other themes
  const powerEmojis: string[] = [];
  for (let i = 0; i < numPowerPairs; i++) {
    let emoji = "";
    do {
      const themeIndex = Math.floor(Math.random() * otherThemes.length);
      const theme = otherThemes[themeIndex];
      emoji = getRandomEmojiInTheme(theme);
    } while (powerEmojis.includes(emoji)); // Avoid inserting duplicates
    powerEmojis.push(emoji);
  }

  const emojis = [
    ...powerEmojis,
    ...getRandomEmojisInTheme(iconTheme, numPairs - numPowerPairs),
  ];
  const cards = [];

  for (let i = 0; i < numPairs; i++) {
    const emoji = emojis[i];
    const id1 = numPairs * 100 + i * 2;
    const id2 = id1 + 1;
    const isPowerCard = i < numPowerPairs;
    cards.push(
      {
        id: id1,
        emoji,
        isFaceUp,
        isMatched: false,
        isPowerCard,
        timesSeen: 0,
      },
      {
        id: id2,
        emoji,
        isFaceUp,
        isMatched: false,
        isPowerCard,
        timesSeen: 0,
      }
    );
  }

  return isShuffled ? shuffleArray(cards) : cards;
}
