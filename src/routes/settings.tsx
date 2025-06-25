import {
  useSettings,
  useSettingsDispatch,
  type CardColor,
  type IconTheme,
} from "@/context/settings.context";

const colorClass = {
  amber: "bg-amber-600",
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
};

function Settings() {
  const {
    cardColor,
    iconTheme,
  } = useSettings();

  const dispatch = useSettingsDispatch();

  const handleCardColorChange = (value: string) => {
    const cardColor = value as CardColor;
    dispatch({ type: "set_card_color", payload: cardColor});
  };

  const handleIconThemeChange = (value: string) => {
    const iconTheme = value as IconTheme;
    dispatch({ type: "set_icon_theme", payload: iconTheme });
  };

  return (
    <div className="hero bg-base-100 h-full">
      <div className="h-full hero-content flex-col lg:flex-row justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Settings</h1>
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
                <option value="smileys-and-emotion">
                  😎 Smileys & Emotion
                </option>
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
      </div>
    </div>
  );
}

export default Settings;
