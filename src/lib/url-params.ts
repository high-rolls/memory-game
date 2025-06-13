import type { CardCount, IconTheme } from "@/context/game-settings";

export function parseIconTheme(
  searchParams: URLSearchParams
): IconTheme | undefined {
  const themeParam = searchParams.get("icon-theme");
  const validThemes = new Set<IconTheme>([
    "activities",
    "animals",
    "flags",
    "food-and-drink",
    "objects",
    "people-and-body",
    "smileys-and-emotion",
  ]);
  if (validThemes.has(themeParam as IconTheme)) {
    return themeParam as IconTheme;
  }
}

export function parseCardCount(
  searchParams: URLSearchParams
): CardCount | undefined {
  const countParam = searchParams.get("card-count");
  const validCounts = new Set<CardCount>([8, 12, 16, 20, 24, 28, 32]);
  const parsedCount = Number(countParam);
  if (validCounts.has(parsedCount as CardCount)) {
    return parsedCount as CardCount;
  }
}
