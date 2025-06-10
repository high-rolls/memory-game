export function divisors(x: number) {
  if (!Number.isInteger(x)) {
    throw new Error('X must be an integer number.');
  }

  const divisorValues = [1, x];
  for (let d = 2; d <= Math.floor(Math.sqrt(x)); d++) {
    if (x % d === 0) {
      divisorValues.push(d);
      if (d !== x / d) {
        divisorValues.push(x / d);
      }
    }
  }
  divisorValues.sort((a, b) => a - b);
  return divisorValues;
}

export function squarestSides(x: number) {
  const divisorValues = divisors(x);
  const initialIndex = Math.floor((divisorValues.length) / 2);
  const d = divisorValues[initialIndex];
  return [x / d, d];
}