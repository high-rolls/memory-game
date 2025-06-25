import {
  CARD_COLORS,
  ICON_THEMES,
  useSettings,
  useSettingsDispatch,
} from "@/context/settings.context";
import { isInArray } from "@/lib/utils";

const colorClass = {
  amber: "bg-amber-600",
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
};

function Settings() {
  const { cardColor, iconTheme } = useSettings();

  const dispatch = useSettingsDispatch();

  const handleCardColorChange = (value: string) => {
    if (isInArray(CARD_COLORS, value)) {
      dispatch({ type: "set_card_color", payload: value });
    } else {
      console.warn("Invalid card color selected:", value);
    }
  };

  const handleIconThemeChange = (value: string) => {
    if (isInArray(ICON_THEMES, value)) {
      dispatch({ type: "set_icon_theme", payload: value });
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
            defaultValue={iconTheme}
            className="select"
            onChange={(event) => handleIconThemeChange(event.target.value)}
          >
            <option value="activities">⚽ Activities</option>
            <option value="animals">🐸 Animals</option>
            <option value="flags">🚩 Flags</option>
            <option value="food-and-drink">🍎 Food & Drink</option>
            <option value="objects">💍 Objects</option>
            <option value="people-and-body">👄 People & Body</option>
            <option value="smileys-and-emotion">😎 Smileys & Emotion</option>
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
