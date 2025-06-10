import { createContext, useContext, useState } from "react";
import type { CardCount, IconTheme } from "@/lib/types";

export const GameSettingsContext = createContext<{
  iconTheme: IconTheme;
  setIconTheme: (_: IconTheme) => void;
  cardCount: CardCount;
  setCardCount: (_: CardCount) => void;
}>({
  iconTheme: "animals",
  setIconTheme: (_: IconTheme) => {},
  cardCount: 16,
  setCardCount: (_: CardCount) => {},
});

export function useGameSettings() {
  return useContext(GameSettingsContext);
}

export function GameSettingsProvider({ children }: { children: React.ReactNode }) {
  const [iconTheme, setIconTheme] = useState<IconTheme>("animals");
  const [cardCount, setCardCount] = useState<CardCount>(16);

  return (
    <GameSettingsContext value={{ iconTheme, setIconTheme, cardCount, setCardCount }}>
      {children}
    </GameSettingsContext>
  );
}
