import Board from "@/components/board";
import {
  CARD_COLORS,
  ICON_THEMES,
  useSettings,
  useSettingsDispatch,
  type IconThemeId,
} from "@/context/settings.context";
import { createCardArray } from "@/lib/game";
import { isInArray } from "@/lib/utils";

const colorClass = {
  amber: "bg-amber-600",
  emerald: "bg-emerald-600",
  pink: "bg-pink-600",
  purple: "bg-purple-600",
  sky: "bg-sky-600",
};

function Settings() {
  const { cardColor, iconThemeId } = useSettings();
  const cards = createCardArray(iconThemeId, true, 12, 0, true);

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
    <div className="flex flex-col h-full justify-center items-center p-6 gap-3">
      <div className="flex flex-2 w-full max-w-sm md:max-w-md flex-col">
        <Board cards={cards} hideMatchedCards={false} />
      </div>
      <div className="flex-1 flex flex-col">
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
          {/* TODO: Change this to a custom selector which displays card back squares of each color. */}
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
            <option className={colorClass["pink"]} value="pink">
              Pink
            </option>
            <option className={colorClass["purple"]} value="purple">
              Purple
            </option>
            <option className={colorClass["sky"]} value="sky">
              Sky
            </option>
          </select>
        </label>
      </div>
      </div>
    </div>
  );
}

export default Settings;
