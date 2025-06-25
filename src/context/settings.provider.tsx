import { useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  defaultSettings,
  SettingsContext,
  SettingsDispatchContext,
  type Settings,
  type SettingsAction,
} from "./settings.context";

function reducer(state: Settings, action: SettingsAction): Settings {
  switch (action.type) {
    case "set_card_color":
      return { ...state, cardColor: action.payload };
    case "set_icon_theme":
      return { ...state, iconTheme: action.payload };
    case "set_sound_volume":
      return { ...state, soundVolume: action.payload };
    default:
      return state;
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [persisted, setPersisted] = useLocalStorage<Settings>(
    "settings",
    defaultSettings
  );

  const [state, dispatch] = useReducer(reducer, persisted);

  // Persist to localStorage on changes
  useEffect(() => {
    setPersisted(state);
  }, [state, setPersisted]);

  return (
    <SettingsContext value={state}>
      <SettingsDispatchContext value={dispatch}>
        {children}
      </SettingsDispatchContext>
    </SettingsContext>
  );
}
