import { useLocalStorage } from "usehooks-ts";
import {
  SettingsActionsContext,
  SettingsContext,
  type CardColor,
  type IconTheme,
  type Settings,
} from "./settings.context";
import { useMemo } from "react";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage<Settings>("game-settings", {
    cardColor: "amber",
    iconTheme: "animals",
    soundVolume: 1,
  });

  const actions = useMemo(
    () => ({
      setCardColor: (cardColor: CardColor) =>
        setSettings({ ...settings, cardColor }),
      setIconTheme: (iconTheme: IconTheme) =>
        setSettings({ ...settings, iconTheme }),
      setSoundVolume: (soundVolume: number) =>
        setSettings({ ...settings, soundVolume }),
    }),
    [settings, setSettings]
  );

  return (
    <SettingsActionsContext value={actions}>
      <SettingsContext value={settings}>{children}</SettingsContext>
    </SettingsActionsContext>
  );
}
