import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import Card from "./Card";
import { useTimeout } from "../hooks/use-timeout";
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
  const [state, setState] = useState("initial");

  const flippedCount = cards.filter((c) => c.flipped).length;
  const matchCount = cards.filter((c) => c.matched).length / 2;
  const hasWon = matchCount === cards.length / 2;

  const resolveMatches = () => {
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

  const handleCardClicked = (cardClicked: CardData) => {
    if (state !== "playing") {
      return;
    }

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

  const startGame = () => {
    const flippedCards = createRandomCards().map(c => {
      return {
        ...c,
        flipped: true
      } as CardData;
    });
    setState("displaying-cards");
    setCards(flippedCards);
    useTimeout(() => {
      const unflippedCards = flippedCards.map(c => {
        return {
          ...c,
          flipped: false,
        } as CardData;
      });
      setState("playing");
      setCards(unflippedCards);
    }, 3000);
  };

  if (state === 'playing' && flippedCount === 2) {
    useTimeout(resolveMatches, 1000);
  }

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
        <div className="mt-3 flex flex-col items-center">
          {hasWon && (
            <h1 className="text-3xl sm:text-5xl font-bold text-lime-100">
              You've won!
            </h1>
          )}
          {(state === "initial" || hasWon) && (
            <button
              className="mt-3 p-3 flex justify-start items-center gap-2 text-lg rounded-md font-semibold text-black bg-lime-500 hover:bg-lime-600"
              onClick={() => startGame()}
            >
              <RefreshCw color="black" size={20} /> New Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
