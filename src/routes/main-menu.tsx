import Board from "@/components/board";
import { useGameSettings } from "@/context/game-settings-context";
import { createCardArray } from "@/lib/game";
import type { CardCount, IconTheme } from "@/lib/types";
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
  const { cardCount, setCardCount, iconTheme, setIconTheme } =
    useGameSettings();

  const cards = createCardArray(cardCount, true);

  const handleCardCountChange = (value: string) => {
    const intValue = parseInt(value) as CardCount;
    setCardCount(intValue);
  };

  const handleIconThemeChange = (value: string) => {
    setIconTheme(value as IconTheme);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-full flex-col lg:flex-row">
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
                <option value="animals">🐸 Animals</option>
                <option value="fruits">🍎 Fruits</option>
              </select>
            </label>
          </div>
          <button
            className="w-full btn btn-primary"
            onClick={() => navigate("/memory-game/play")}
          >
            Play
          </button>
        </div>
        <div className="w-full flex justify-center lg:justify-start">
          <Board cards={cards} />
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
