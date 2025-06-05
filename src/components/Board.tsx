import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import Card from "./Card";
import type { CardData } from "../types";

function shuffle<T>(items: T[]): T[] {
  const newArr = new Array(...items);
  for (let i = 0; i < newArr.length; i++) {
    const tmp = newArr[i];
    const k = Math.floor(Math.random() * newArr.length);
    newArr[i] = newArr[k];
    newArr[k] = tmp;
  }
  return newArr;
}

const createRandomCards = () => {
  const nums = new Array(8).fill(0).map((_value, index) => index);
  return shuffle(
    [...nums, ...nums].map((value, index) => {
      return {
        id: index,
        value: value,
        flipped: false,
        matched: false,
      } as CardData;
    })
  );
};

const initialCards = createRandomCards();

const Board = () => {
  const [cards, setCards] = useState(initialCards);
  const flippedCount = cards.filter((c) => c.flipped).length;
  const matchCount = cards.filter((c) => c.matched).length / 2;
  const hasWon = matchCount === cards.length / 2;

  useEffect(() => {
    if (flippedCount === 2) {
      const checkMatches = () => {
        const flippedCards = cards.filter((c) => c.flipped);
        if (flippedCards[0].value === flippedCards[1].value) {
          // Cards match, unflip and mark them as matched
          const newCards = cards.map((c) => {
            if (c.flipped) {
              return {
                ...c,
                flipped: false,
                matched: true,
              } as CardData;
            }
            return c;
          });
          setCards(newCards);
        } else {
          // No match, just unflip
          const newCards = cards.map((c) => {
            if (c.flipped) {
              return {
                ...c,
                flipped: false,
              } as CardData;
            }
            return c;
          });
          setCards(newCards);
        }
      };

      const timerId = setTimeout(() => {
        checkMatches();
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [cards, flippedCount]);

  const handleCardClicked = (cardClicked: CardData) => {
    if (cardClicked.flipped || cardClicked.matched) return;

    if (flippedCount === 2) {
      return;
    }

    const newCards = cards.map((c) => {
      if (c.id === cardClicked.id) {
        return {
          ...c,
          flipped: true,
        } as CardData;
      }
      return c;
    });
    setCards(newCards);
  };

  const resetBoard = () => {
    setCards(createRandomCards());
  };

  return (
    <div
      className={`${
        hasWon ? "bg-emerald-900" : "bg-gray-800"
      } flex justify-center items-center min-h-screen`}
    >
      <div>
        <h1 className="mt-3 text-3xl sm:text-5xl text-gray-100">
          {matchCount === 0 ? "No" : matchCount} match{matchCount !== 1 && "es"}
        </h1>
        <div className={`mt-2 rounded-md grid grid-cols-4 gap-3`}>
          {cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              onClick={() => handleCardClicked(card)}
            />
          ))}
        </div>
        {hasWon && (
          <div className="mt-3 flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl font-bold text-lime-100">
              You've won!
            </h1>
            <button
              className="mt-3 p-3 flex justify-start items-center gap-2 text-lg rounded-md font-semibold text-black bg-lime-500 hover:bg-lime-600"
              onClick={() => resetBoard()}
            >
              <RefreshCw color="black" size={20} /> New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
