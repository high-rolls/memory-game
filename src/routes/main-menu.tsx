import Board from "@/components/board";
import { useGameSettings } from "@/context/game-settings-context";
import { createCardArray } from "@/lib/game";
import type { CardCount } from "@/lib/types";
import { useNavigate } from "react-router";

function MainMenu() {
  const navigate = useNavigate();
  const { cardCount, setCardCount } = useGameSettings();

  const cards = createCardArray(cardCount, true);

  const handleCardCountChange = (value: string) => {
    const intValue = parseInt(value) as CardCount;
    setCardCount(intValue);
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="p-2">
          <Board cards={cards} />
        </div>
        <div>
          <h1 className="mb-2 text-5xl font-bold">Memory Game</h1>
          <h2 className="mb-1 text-3xl font-bold text-slate-400">Number of Cards</h2>
          <div className="mb-2 w-full max-w-xs">
            <input
              type="range"
              min="8"
              max="16"
              value={cardCount}
              onChange={(event) => handleCardCountChange(event.target.value)}
              className="range"
              step="4"
            />
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
          <button className="btn btn-primary" onClick={() => navigate("/memory-game/play")}>Play</button>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
