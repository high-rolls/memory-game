import type { CardData } from "@/lib/types";

export function createCardArray (numCards: number, isFaceUp: boolean): CardData[] {
  if (numCards < 2 || numCards % 2 !== 0) {
    throw new Error("Card amount must be a positive number divisible by 2.");
  }

  const values = Array.from({ length: numCards / 2 }, (_, i) => i);
  return [...values, ...values].map((value, index) => ({
    id: length * 100 + index,
    value,
    isFaceUp,
    isMatched: false,
  }));
};