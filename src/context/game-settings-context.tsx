import { createContext, useContext, useState } from "react";
import type { CardCount, IconTheme } from "@/lib/types";
import { getRandomEmojisInTheme } from "@/lib/themes";

export const GameSettingsContext = createContext<{
  iconTheme: IconTheme;
  setIconTheme: (_: IconTheme) => void;
  cardCount: CardCount;
  setCardCount: (_: CardCount) => void;
  icons: string[];
  setIcons: (_: string[]) => void;
}>({
  iconTheme: "animals",
  setIconTheme: (_: IconTheme) => {},
  cardCount: 16,
  setCardCount: (_: CardCount) => {},
  icons: getRandomEmojisInTheme("animals", 16),
  setIcons: (_: string[]) => {},
});

export function useGameSettings() {
  return useContext(GameSettingsContext);
}

export function GameSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [iconTheme, setIconTheme] = useState<IconTheme>("animals");
  const [cardCount, setCardCount] = useState<CardCount>(16);
  const [icons, setIcons] = useState<string[]>(
    getRandomEmojisInTheme(iconTheme, cardCount / 2)
  );

  return (
    <GameSettingsContext
      value={{
        iconTheme,
        setIconTheme,
        cardCount,
        setCardCount,
        icons,
        setIcons,
      }}
    >
      {children}
    </GameSettingsContext>
  );
}
