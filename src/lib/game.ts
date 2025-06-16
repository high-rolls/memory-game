import type { CardData } from "@/lib/types";

export function createCardArray(
  numPairs: number,
  numPowerPairs: number,
  isFaceUp: boolean
): CardData[] {
  if (numPairs <= 0) {
    throw new Error("Number of pairs must be a positive number.");
  }

  const values = Array.from({ length: numPairs }, (_, i) => i);
  return [...values, ...values].map((value, index) => ({
    id: length * 100 + index,
    value,
    isFaceUp,
    isMatched: false,
    isPowerCard: value < numPowerPairs,
    timesSeen: 0,
  }));
}
