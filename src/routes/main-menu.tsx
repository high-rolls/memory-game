import Board from "@/components/board";
import {
  useGameSettingsFull,
  type CardCount,
  type IconTheme,
} from "@/context/game-settings";
import { createCardArray } from "@/lib/game";
import { getRandomEmojisInTheme } from "@/lib/themes";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

const CARD_COUNT_MIN = 8;
const CARD_COUNT_MAX = 32;
const CARD_COUNT_STEP = 4;

const CARD_COUNT_VALUES = new Array(
  (CARD_COUNT_MAX - CARD_COUNT_MIN) / CARD_COUNT_STEP + 1
)
  .fill(0)
  .map((_, index) => index * CARD_COUNT_STEP + CARD_COUNT_MIN);

function MainMenu() {
  const navigate = useNavigate();
  const { cardCount, iconTheme, setCardCount, setIcons, setIconTheme } =
    useGameSettingsFull();

  // Create a separate card collection for each board size
  const cards = useMemo(() => createCardArray(cardCount, true), [cardCount]);

  // Display the card icons always in the same order in the menu,
  // and memorize them based on the icon theme and card count.
  useEffect(
    () => setIcons(getRandomEmojisInTheme(iconTheme, cardCount / 2)),
    [iconTheme, cardCount, setIcons]
  );

  const handleCardCountChange = (value: string) => {
    const intValue = parseInt(value) as CardCount;
    setCardCount(intValue);
  };

  const handleIconThemeChange = (value: string) => {
    setIconTheme(value as IconTheme);
  };

  const searchParams = new URLSearchParams();
  searchParams.set("card-count", cardCount.toString());
  searchParams.set("icon-theme", iconTheme);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row justify-center">
        <div className="w-xs flex justify-center lg:justify-start">
          <Board cards={cards} heightRatio={0.5} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Memoji</h1>
          <div className="w-full max-w-xs">
            <label>
              <span className="text-lg font-bold text-slate-400">
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
              <span className="text-lg font-bold text-slate-400">
                Card Theme
              </span>
              <select
                defaultValue={iconTheme}
                className="select"
                onChange={(event) => handleIconThemeChange(event.target.value)}
              >
                <option value="activities">⚽ Activities</option>
                <option value="animals">🐸 Animals</option>
                <option value="flags">🚩 Flags</option>
                <option value="foods">🍎 Food</option>
                <option value="objects">💍 Objects</option>
                <option value="people-and-body">👄 People & Body</option>
                <option value="smileys-and-emotion">😎 Smileys & Emotion</option>
              </select>
            </label>
          </div>
          <button
            className="w-full btn btn-primary"
            onClick={() =>
              navigate(`/memory-game/play?${searchParams.toString()}`)
            }
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
