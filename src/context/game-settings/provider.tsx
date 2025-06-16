import { getEmojisForTheme } from "@/lib/themes";
import { useMemo, useState } from "react";
import { GameSettingsActionsContext, GameSettingsContext } from "./context";
import type { CardColor, CardCount, IconTheme } from "./types";
import { useSearchParams } from "react-router";
import {
  parseCardColor,
  parseCardCount,
  parseIconTheme,
} from "@/lib/url-params";

export function GameSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams] = useSearchParams();
  const [cardCount, setCardCount] = useState<CardCount>(
    parseCardCount(searchParams) ?? 36
  );
  const [iconTheme, setIconTheme] = useState<IconTheme>(
    parseIconTheme(searchParams) ?? "animals"
  );
  const [cardColor, setCardColor] = useState<CardColor>(
    parseCardColor(searchParams) ?? "amber"
  );
  const [icons, setIcons] = useState<string[]>(() =>
    getEmojisForTheme(iconTheme, cardCount / 2)
  );

  const settings = useMemo(
    () => ({ iconTheme, cardColor, cardCount, icons }),
    [iconTheme, cardColor, cardCount, icons]
  );

  const actions = useMemo(
    () => ({
      setCardColor,
      setCardCount,
      setIconTheme,
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
