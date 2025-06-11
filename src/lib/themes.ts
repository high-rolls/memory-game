import type { IconTheme } from "@/lib/types";
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
  "activities": getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Activities"),
  "animals": getEmojisByGroupAndSubgroupPrefix(
    emojiJSON,
    "Animals & Nature",
    "animal"
  ),
  "drinks": getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Food & Drink", "drink"),
  "flags": getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Flags"),
  "foods": getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Food & Drink", "food"),
  "objects": getEmojisByGroupAndSubgroupPrefix(emojiJSON, "Objects"),
  "people-and-body": getEmojisByGroupAndSubgroupPrefix(emojiJSON, "People & Body"),
};

export function getEmojisForTheme(theme: IconTheme, length?: number) {
  const emojis =
    themeEmojis[theme] || themeEmojis.animals;
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
