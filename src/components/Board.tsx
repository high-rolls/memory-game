import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Card from "./Card";
import type { CardData } from "../types";
import JSConfetti from 'js-confetti';

function shuffleArray<T>(arr: T[]): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const createCardArray = (numCards: number, isFaceUp: boolean): CardData[] => {
  if (numCards < 2 || numCards % 2 !== 0) {
    throw new Error("Card number must be a positive number divisible by 2.");
  }

  const values = Array.from({ length: numCards / 2 }, (_, i) => i);
  return [...values, ...values].map((value, index) => ({
    id: index,
    value,
    isFaceUp,
    isMatched: false,
  }));
};
const emojis = ["🐁", "🦉", "🦥", "🐎", "🦖", "🐓", "🦐", "🦋"];
const initialCards = createCardArray(16, false);
const confetti = new JSConfetti();

const Board = () => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [state, setState] = useState<
    "initial" | "displaying-cards" | "playing" | "win"
  >("initial");

  const matchCount = cards.filter((card) => card.isMatched).length / 2;

  if (state === "playing" && matchCount === 8) {
    setState("win");
    confetti.addConfetti({
      emojis: emojis,
      confettiNumber: 16,
      emojiSize: 100,
    });
    navigator.vibrate(100);
  }

  const markMatched = (ids: number[]) => {
    setCards((prev) =>
      prev.map((card) =>
        ids.includes(card.id) ? { ...card, isMatched: true } : card
      )
    );
  };

  const resetUnmatched = (ids: number[]) => {
    setCards((prev) =>
      prev.map((card) =>
        ids.includes(card.id) ? { ...card, isFaceUp: false } : card
      )
    );
  };

  const checkAndResolveMatch = (updatedCards: CardData[]) => {
    const faceUp = updatedCards.filter((c) => c.isFaceUp && !c.isMatched);
    if (faceUp.length !== 2) return;

    const [a, b] = faceUp;

    setTimeout(() => {
      if (a.value === b.value) {
        markMatched([a.id, b.id]);
      } else {
        resetUnmatched([a.id, b.id]);
      }
    }, 500);
  };

  const handleCardClicked = (clickedCard: CardData) => {
    if (state !== "playing") return;
    if (clickedCard.isFaceUp || clickedCard.isMatched) return;

    const currentlyFaceUp = cards.filter((c) => c.isFaceUp && !c.isMatched);
    if (currentlyFaceUp.length >= 2) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFaceUp: true } : card
    );
    setCards(updatedCards);

    if (currentlyFaceUp.length === 1) {
      checkAndResolveMatch(updatedCards);
    }
  };

  const startGame = () => {
    const shuffled = shuffleArray(cards).map((card) => ({
      ...card,
      isFaceUp: true,
      isMatched: false,
    }));
    setCards(shuffled);
    setState("displaying-cards");

    setTimeout(() => {
      setCards((prev) => prev.map((card) => ({ ...card, isFaceUp: false })));
      setState("playing");
    }, 2000);
  };

  return (
    <div
      className={`${
        state === "win" ? "bg-emerald-900" : "bg-slate-800"
      } flex justify-center items-center min-h-screen`}
    >
      <div>
        <div className="mt-2 rounded-md grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <Card
              {...card}
              key={card.id}
              emoji={emojis[card.value]}
              onClick={() => handleCardClicked(card)}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-col items-center">
          {state === "playing" && (
            <h1 className="text-3xl sm:text-5xl text-gray-100 font-light">
              {matchCount === 0 ? "No" : (
                <span className="font-bold">{matchCount}</span>
              )} match
              {matchCount !== 1 && "es"}
            </h1>
          )}
          {state === "win" && (
            <h1 className="mb-3 text-3xl sm:text-5xl font-bold text-lime-100">
              You've won!
            </h1>
          )}
          {state === "displaying-cards" && (
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-100">
              Get Ready...
            </h1>
          )}
          {(state === "initial" || state === "win") && (
            <button
              className="p-3 flex justify-start items-center gap-2 text-lg rounded-md font-semibold text-black bg-lime-500 hover:bg-lime-600"
              onClick={startGame}
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
