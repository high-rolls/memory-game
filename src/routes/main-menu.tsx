import Board from "@/components/board";
import {
  useGameSettingsFull,
  type CardColor,
  type CardCount,
  type IconTheme,
} from "@/context/game-settings";
import { createCardArray } from "@/lib/game";
import { useMemo } from "react";

const CARD_COUNT_MIN = 12;
const CARD_COUNT_MAX = 84;
const CARD_COUNT_STEP = 12;

const CARD_COUNT_VALUES = new Array(
  (CARD_COUNT_MAX - CARD_COUNT_MIN) / CARD_COUNT_STEP + 1
)
  .fill(0)
  .map((_, index) => index * CARD_COUNT_STEP + CARD_COUNT_MIN);

const colorClass = {
  amber: "bg-amber-600",
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
};

function MainMenu() {
  const {
    cardColor,
    cardCount,
    iconTheme,
    setCardColor,
    setCardCount,
    setIconTheme,
  } = useGameSettingsFull();

  // Create a separate card collection for each board size
  const cards = useMemo(
    () => createCardArray(iconTheme, true, cardCount / 2, 0, true),
    [cardCount, iconTheme]
  );

  const handleCardColorChange = (value: string) => {
    setCardColor(value as CardColor);
  };

  const handleCardCountChange = (value: string) => {
    const intValue = parseInt(value) as CardCount;
    setCardCount(intValue);
  };

  const handleIconThemeChange = (value: string) => {
    setIconTheme(value as IconTheme);
  };

  return (
    <div className="hero bg-base-100 h-full">
      <div className="h-full hero-content flex-col lg:flex-row justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex w-xs md:w-md justify-center lg:justify-start">
            <Board cards={cards} heightRatio={0.4} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="w-full max-w-xs">
            <label>
              <span className="text-lg font-bold text-base-content">
                Card Count
              </span>
              <input
                type="range"
                min={CARD_COUNT_MIN}
                max={CARD_COUNT_MAX}
                value={cardCount}
                onChange={(event) => handleCardCountChange(event.target.value)}
                className="range range-xs"
                step={CARD_COUNT_STEP}
              />
            </label>
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {CARD_COUNT_VALUES.map((value) => (
                <span key={value}>|</span>
              ))}
            </div>
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {CARD_COUNT_VALUES.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </div>
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

export default MainMenu;
