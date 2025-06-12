import { getEmojisForTheme } from "@/lib/themes";
import { useMemo, useState } from "react";
import { GameSettingsActionsContext, GameSettingsContext } from "./context";
import type { CardCount, IconTheme } from "./types";

export function GameSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [iconTheme, setIconTheme] = useState<IconTheme>("animals");
  const [cardCount, setCardCount] = useState<CardCount>(16);
  const [icons, setIcons] = useState<string[]>(() =>
    getEmojisForTheme(iconTheme, cardCount / 2)
  );

  const settings = useMemo(
    () => ({ iconTheme, cardCount, icons }),
    [iconTheme, cardCount, icons]
  );

  const actions = useMemo(
    () => ({
      setIconTheme,
      setCardCount,
      setIcons,
    }),
    []
  );

  return (
    <GameSettingsActionsContext.Provider value={actions}>
      <GameSettingsContext.Provider value={settings}>
        {children}
      </GameSettingsContext.Provider>
    </GameSettingsActionsContext.Provider>
  );
}
