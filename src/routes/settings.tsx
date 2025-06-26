import {
  CARD_COLORS,
  ICON_THEMES,
  useSettings,
  useSettingsDispatch,
  type IconThemeId,
} from "@/context/settings.context";
import { isInArray } from "@/lib/utils";

const colorClass = {
  amber: "bg-amber-600",
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
};

function Settings() {
  const { cardColor, iconThemeId } = useSettings();

  const dispatch = useSettingsDispatch();

  const handleCardColorChange = (value: string) => {
    if (isInArray(CARD_COLORS, value)) {
      dispatch({ type: "set_card_color", payload: value });
    } else {
      console.warn("Invalid card color selected:", value);
    }
  };

  const handleIconThemeChange = (value: string) => {
    const iconTheme = ICON_THEMES.find((theme) => theme.id === value);
    if (iconTheme) {
      dispatch({ type: "set_icon_theme_id", payload: value as IconThemeId });
    } else {
      console.warn("Invalid icon theme selected:", value);
    }
  };

  return (
    <div className="flex flex-col items-center p-3 gap-3">
      <h1 className="text-4xl font-bold">Settings</h1>
      <div className="w-full max-w-xs">
        <label>
          <span className="text-lg font-bold text-base-content">
            Emoji Theme
          </span>
          <select
            defaultValue={iconThemeId}
            className="select"
            onChange={(event) => handleIconThemeChange(event.target.value)}
          >
            {ICON_THEMES.map(({ id, emoji, label }) => (
              <option key={id} value={id}>
                {emoji} {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="w-full max-w-xs">
        <label>
          <span className="text-lg font-bold text-base-content">
            Card Color
          </span>
          <select
            defaultValue={cardColor}
            className={`select ${colorClass[cardColor]}`}
            onChange={(event) => handleCardColorChange(event.target.value)}
          >
            <option className={colorClass["amber"]} value="amber">
              Amber
            </option>
            <option className={colorClass["emerald"]} value="emerald">
              Emerald
            </option>
            <option className={colorClass["purple"]} value="purple">
              Purple
            </option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Settings;
