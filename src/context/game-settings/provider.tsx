import { useMemo } from "react";
import { GameSettingsActionsContext, GameSettingsContext } from "./context";
import type { CardColor, GameSettings, IconTheme } from "./types";

import { useLocalStorage } from "usehooks-ts";

export function GameSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useLocalStorage<GameSettings>(
    "game-settings",
    {
      cardColor: "amber",
      iconTheme: "animals",
      soundVolume: 1,
    }
  );

  const actions = useMemo(
    () => ({
      setCardColor: (cardColor: CardColor) =>
        setSettings({ ...settings, cardColor }),
      setIconTheme: (iconTheme: IconTheme) =>
        setSettings({ ...settings, iconTheme }),
      setSoundVolume: (soundVolume: number) =>
        setSettings({ ...settings, soundVolume })
    }),
    [settings, setSettings]
  );

  return (
    <GameSettingsActionsContext.Provider value={actions}>
      <GameSettingsContext.Provider value={settings}>
        {children}
      </GameSettingsContext.Provider>
    </GameSettingsActionsContext.Provider>
  );
}
