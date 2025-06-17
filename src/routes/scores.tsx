import type { CardCount, IconTheme } from "@/context/game-settings";
import { THEME_NAMES } from "@/lib/themes";
import { useLocalStorage } from "usehooks-ts";

export type Score = {
  cardCount: CardCount;
  score: number;
  iconTheme: IconTheme;
  date: Date;
};

const Scores = () => {
  const [scores] = useLocalStorage<Score[]>("scores", []);

  if (!scores.length) {
    return (
      <div className="flex p-3 flex-col items-center">
        <h1 className="text-4xl font-bold text-primary-content">No scores</h1>
      </div>
    );
  }

  return (
    <div className="flex p-3 pb-0 md:pb-3 flex-col h-full items-center gap-3">
      <h1 className="text-4xl font-bold text-primary-content">Top Scores</h1>
      <div className="w-sm md:w-lg overflow-x-auto overflow-y-scroll rounded-box border border-base-content/5 bg-base-100">
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
            {scores
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
      </div>
    </div>
  );
};

export default Scores;
