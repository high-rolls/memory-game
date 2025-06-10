import Board from "@/components/board";
import { useGameSettings } from "@/context/game-settings-context";
import { createCardArray } from "@/lib/game";
import type { CardCount, IconTheme } from "@/lib/types";
import { useNavigate } from "react-router";

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
      <div className="hero-content flex-col lg:flex-row">
        <div className="">
          <Board cards={cards} />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">Memoji</h1>
          <div className="w-full max-w-xs">
            <label>
              <span className="text-2xl font-bold text-slate-400">
                Card Count
              </span>
              <input
                type="range"
                min="8"
                max="16"
                value={cardCount}
                onChange={(event) => handleCardCountChange(event.target.value)}
                className="range range-xs"
                step="4"
              />
            </label>
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between px-2.5 mt-2 text-xs">
              <span>8</span>
              <span>12</span>
              <span>16</span>
            </div>
          </div>
          <div className="w-full max-w-xs">
            <label>
              <span className="text-2xl font-bold text-slate-400">
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
      </div>
    </div>
  );
}

export default MainMenu;
