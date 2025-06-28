export function divisors(x: number) {
  if (!Number.isInteger(x)) {
    throw new Error("X must be an integer number.");
  }

  const result = new Set<number>();
  result.add(1);
  result.add(x);

  const sqrtX = Math.floor(Math.sqrt(x));

  for (let d = 2; d <= sqrtX; d++) {
    if (x % d === 0) {
      result.add(d);
      result.add(x / d);
    }
  }
  return Array.from(result).sort((a, b) => a - b);
}

export function squarestSides(x: number) {
  const divisorValues = divisors(x);
  const initialIndex = Math.floor(divisorValues.length / 2);
  const d = divisorValues[initialIndex];
  return [x / d, d];
}
