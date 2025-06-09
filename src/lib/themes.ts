export type Theme = "animals" | "fruits";

export const themeEmojis = {
  animals: ["🐁", "🦉", "🦥", "🐎", "🦖", "🐓", "🦐", "🦋"],
  fruits: ["🍎", "🍊", "🍋", "🍉", "🍇", "🍓", "🍌", "🍍"],
};

export const getEmojisForTheme = (theme: Theme) => {
  return themeEmojis[theme as keyof typeof themeEmojis] || themeEmojis.animals;
};