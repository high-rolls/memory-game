export type IconTheme = "animals" | "fruits";

export const themeEmojis = {
  animals: ["🐁", "🦉", "🦥", "🐎", "🦖", "🐓", "🦐", "🦋"],
  fruits: ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍌", "🍍"],
};

export const getEmojisForTheme = (theme: IconTheme) => {
  return themeEmojis[theme as keyof typeof themeEmojis] || themeEmojis.animals;
};