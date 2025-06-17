import type { IconTheme } from "@/context/game-settings";
import { shuffleArray } from "./utils";
import emojiJSON from "@/assets/json/categories.min.json";

type EmojiEntry = {
  emoji: string;
  name: string;
  code?: string[];
};

type EmojiSubgroup = {
  [subgroup: string]: EmojiEntry[];
};

type EmojiGroup = {
  [group: string]: EmojiSubgroup;
};

type EmojiJSON = {
  emojis: EmojiGroup;
};

function getEmojisByGroupAndSubgroupPrefix(
  data: EmojiJSON,
  groupName: string,
  subgroupPrefix?: string
): string[] {
  const group = data.emojis[groupName];
  if (!group) return [];

  const matchedEmojis: string[] = [];

  for (const [subgroupName, entries] of Object.entries(group)) {
    if (!subgroupPrefix || subgroupName.startsWith(subgroupPrefix)) {
      for (const entry of entries) {
        matchedEmojis.push(entry.emoji);
      }
    }
  }

  return matchedEmojis;
}

export const themeEmojis: Record<IconTheme, string[]> = {
  activities: getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Activities"),
  animals: getEmojisByGroupAndSubgroupPrefix(
    emojiJSON,
    "Animals & Nature",
    "animal"
  ),
  flags: getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Flags"),
  "food-and-drink": getEmojisByGroupAndSubgroupPrefix(
    emojiJSON,
    "Food & Drink"
  ),
  objects: getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Objects"),
  "people-and-body": getEmojisByGroupAndSubgroupPrefix(
    emojiJSON,
    "People & Body"
  ),
  "smileys-and-emotion": getEmojisByGroupAndSubgroupPrefix(
    emojiJSON,
    "Smileys & Emotion"
  ),
};

export const THEME_NAMES: Record<IconTheme, string> = {
  activities: "Activities",
  animals: "Animals",
  flags: "Flags",
  "food-and-drink": "Food & Drink",
  objects: "Objects",
  "people-and-body": "People & Body",
  "smileys-and-emotion": "Smileys & Emotion",
};

export function getEmojisForTheme(theme: IconTheme, length?: number) {
  const emojis = themeEmojis[theme] || themeEmojis.animals;
  if (length) return emojis.slice(0, length);
  return emojis;
}

export function getRandomEmojisInTheme(theme: IconTheme, length: number) {
  const allEmojis = getEmojisForTheme(theme);
  if (length > allEmojis.length) {
    throw new Error(
      "Provided length is greater than the number of emoji in theme."
    );
  }
  const shuffled = shuffleArray(allEmojis);
  return shuffled.slice(0, length);
}

export function getRandomEmojiInTheme(theme: IconTheme) {
  const allEmojis = getEmojisForTheme(theme);
  const randomIndex = Math.floor(Math.random() * allEmojis.length);
  return allEmojis[randomIndex];
}
