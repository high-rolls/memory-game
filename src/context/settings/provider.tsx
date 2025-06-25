import { useMemo } from "react";
import { SettingsActionsContext, SettingsContext } from "./context";
import type { CardColor, Settings, IconTheme } from "./types";

import { useLocalStorage } from "usehooks-ts";

export function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useLocalStorage<Settings>(
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
    <SettingsActionsContext.Provider value={actions}>
      <SettingsContext.Provider value={settings}>
        {children}
      </SettingsContext.Provider>
    </SettingsActionsContext.Provider>
  );
}
