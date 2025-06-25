import type { IconTheme } from "@/context/settings";
import { THEME_NAMES } from "@/lib/themes";
import type { CardCount } from "@/lib/types";
import { useState, type FormEvent } from "react";
import { useLocalStorage } from "usehooks-ts";

export type Score = {
  cardCount: CardCount;
  score: number;
  iconTheme: IconTheme;
  date: Date;
};

const CARD_COUNTS = new Array(7)
  .fill(12)
  .map((value, index) => value * (index + 1));

const ICON_THEMES = [
  {
    id: "activities",
    label: "⚽",
  },
  {
    id: "animals",
    label: "🐸",
  },
  {
    id: "flags",
    label: "🚩",
  },
  {
    id: "food-and-drink",
    label: "🍎",
  },
  {
    id: "objects",
    label: "💍",
  },
  {
    id: "people-and-body",
    label: "👄",
  },
  {
    id: "smileys-and-emotion",
    label: "😎",
  },
];

const Scores = () => {
  const [scores] = useLocalStorage<Score[]>("scores", []);
  const [selectedCardCount, setSelectedCardCount] = useState<CardCount>(0);
  const [selectedIconTheme, setSelectedIconTheme] = useState<IconTheme | "all">(
    "all"
  );

  const onCardCountRadioChange = (event: FormEvent<HTMLDivElement>) => {
    const input = event.target as HTMLInputElement;
    setSelectedCardCount(parseInt(input.value) as CardCount);
  };

  const onIconThemeChange = (event: FormEvent<HTMLDivElement>) => {
    const input = event.target as HTMLInputElement;
    setSelectedIconTheme(input.value as IconTheme);
  };

  let displayedScores = scores;
  if (selectedCardCount > 0) {
    displayedScores = displayedScores.filter(
      (score) => score.cardCount === selectedCardCount
    );
  }

  if (selectedIconTheme !== "all") {
    displayedScores = displayedScores.filter(
      (score) => score.iconTheme === selectedIconTheme
    );
  }

  return (
    <div className="flex p-3 pb-0 md:pb-3 flex-col h-full items-center gap-3">
      <h1 className="text-4xl font-bold text-base-content">Top Scores</h1>
      <div className="w-sm md:w-lg flex-1 overflow-x-auto overflow-y-scroll rounded-box border border-base-content/5 bg-base-100">
        {displayedScores.length > 0 ? (
          <table className="table table-pin-rows">
            {/* head */}
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
                  return (
                    <tr key={date.toISOString()}>
                      <th>{index + 1}</th>
                      <td className="text-end">{score.score}</td>
                      <td className="text-end">{score.cardCount}</td>
                      <td>{THEME_NAMES[score.iconTheme]}</td>
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
          <h1 className="text-center my-3 font-bold text-base-content/60">No Scores</h1>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-lg font-bold text-base-content">Emoji Theme</h2>
        <div
          className="tabs tabs-box tabs-sm sm:tabs-md bg-base-300 mt-1 mb-1 inline-flex flex-nowrap"
          onChange={onIconThemeChange}
        >
          <input
            type="radio"
            name="icon_theme"
            role="tab"
            className="tab w-1/2"
            aria-label="All"
            value="all"
            defaultChecked={selectedIconTheme === "all"}
          />
          {ICON_THEMES.map(({ id, label }) => (
            <input
              type="radio"
              key={id}
              name="icon_theme"
              role="tab"
              className="tab w-1/2"
              aria-label={label}
              value={id}
              defaultChecked={selectedIconTheme === id}
            />
          ))}
        </div>
        <h2 className="text-lg font-bold text-base-content">Card Count</h2>
        <div
          className="tabs tabs-box tabs-sm sm:tabs-md bg-base-300 mt-1 mb-3 inline-flex flex-nowrap"
          onChange={onCardCountRadioChange}
        >
          <input
            type="radio"
            name="card_count"
            role="tab"
            className="tab w-1/2"
            aria-label="All"
            value={0}
            defaultChecked={selectedCardCount === 0}
          />
          {CARD_COUNTS.map((value) => (
            <input
              key={value.toString()}
              type="radio"
              name="card_count"
              role="tab"
              className="tab w-1/2"
              aria-label={value.toString()}
              value={value}
              defaultChecked={selectedCardCount === value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scores;
