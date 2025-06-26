import { ICON_THEMES, type IconThemeId } from "@/context/settings.context";
import { CARD_COUNTS, type CardCount } from "@/lib/types";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Score = {
  cardCount: CardCount;
  score: number;
  iconThemeId: IconThemeId;
  date: Date;
};

const ICON_THEME_OPTIONS = [
  { id: null, emoji: "All", label: null },
  ...ICON_THEMES,
];

const CARD_COUNT_OPTIONS = [null, ...CARD_COUNTS];

const Scores = () => {
  const [scores] = useLocalStorage<Score[]>("scores", []);
  const [selectedCardCount, setSelectedCardCount] = useState<CardCount | null>(
    null
  );
  const [selectedIconThemeId, setSelectedIconThemeId] =
    useState<IconThemeId | null>(null);

  const onCardCountChange = (cardCount: CardCount | null) => {
    setSelectedCardCount(cardCount);
  };

  const onIconThemeIdChange = (iconThemeId: IconThemeId | null) => {
    setSelectedIconThemeId(iconThemeId);
  };

  let displayedScores = scores;
  if (selectedCardCount) {
    displayedScores = displayedScores.filter(
      (score) => score.cardCount === selectedCardCount
    );
  }

  if (selectedIconThemeId) {
    displayedScores = displayedScores.filter(
      (score) => score.iconThemeId === selectedIconThemeId
    );
  }

  return (
    <div className="flex p-3 flex-col md:flex-row-reverse h-full items-center md:justify-center gap-3">
      <div className="flex w-full max-w-lg h-full flex-col items-center gap-3">
        <h1 className="text-4xl font-bold text-base-content">Top Scores</h1>
        <div className="flex-1 w-full overflow-x-auto overflow-y-scroll rounded-box border border-base-content/5 bg-base-100">
          {displayedScores.length > 0 ? (
            <table className="table table-pin-rows">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-end">Score</th>
                  <th className="text-end">Cards</th>
                  <th>Theme</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {displayedScores
                  .sort((a, b) => b.score - a.score)
                  .map((score, index) => {
                    const date = new Date(score.date);
                    const iconThemeLabel =
                      ICON_THEMES.find(
                        (theme) => theme.id === score.iconThemeId
                      )?.label ?? "Unknown";
                    return (
                      <tr key={date.toISOString()}>
                        <th>{index + 1}</th>
                        <td className="text-end">{score.score}</td>
                        <td className="text-end">{score.cardCount}</td>
                        <td>{iconThemeLabel}</td>
                        <td>
                          {date.toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center my-3 font-bold text-base-content/60">
              No Scores
            </h1>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <h2 className="text-lg font-bold text-base-content">Emoji Theme</h2>
        {/* TODO: Turn this into its own component (e.g. Tabs with Tab components as children). */}
        <div
          role="tablist"
          className="tabs tabs-box tabs-sm sm:tabs-md md:w-xs"
        >
          {ICON_THEME_OPTIONS.map(({ id, emoji, label }) => (
            <a
              key={id ? id : "all"}
              role="tab"
              className={`tab md:w-full  gap-1 ${
                selectedIconThemeId === id ? "tab-active" : ""
              }`}
              onClick={() => onIconThemeIdChange(id)}
            >
              {emoji}
              {label && <span className="hidden md:inline"> {label}</span>}
            </a>
          ))}
        </div>
        <h2 className="text-lg font-bold text-base-content">Card Count</h2>
        <div
          role="tablist"
          className="tabs tabs-box tabs-sm sm:tabs-md md:tabs-sm"
        >
          {CARD_COUNT_OPTIONS.map((value) => (
            <a
              key={value ? value.toString() : "all"}
              role="tab"
              className={`tab gap-1 ${
                selectedCardCount === value ? "tab-active" : ""
              }`}
              onClick={() => onCardCountChange(value)}
            >
              {value ?? "All"}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
