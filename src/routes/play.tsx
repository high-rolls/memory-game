import matchSfx from "@/assets/audio/match.ogg";
import Board from "@/components/board";
import StatusBar from "@/components/status-bar";
import { useGameSettingsFull } from "@/context/game-settings";
import { createCardArray } from "@/lib/game";
import { getRandomEmojisInTheme } from "@/lib/themes";
import type { CardData } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import JSConfetti from "js-confetti";
import { useState } from "react";
import useSound from "use-sound";

type GameState = "initial" | "displaying-cards" | "playing" | "win";

const confetti = new JSConfetti();

const Play = () => {
  const { cardCount, iconTheme, icons, setIcons } = useGameSettingsFull();
  const [cards, setCards] = useState<CardData[]>(
    createCardArray(cardCount, false)
  );
  const [state, setState] = useState<GameState>("initial");
  const [playMatchSound] = useSound(matchSfx);

  const matchCount = cards.filter((card) => card.isMatched).length / 2;

  if (state === "playing" && matchCount === cardCount / 2) {
    setState("win");
    confetti.addConfetti();
    navigator.vibrate(100);
  }

  const markMatched = (ids: number[]) => {
    setCards((prev) =>
      prev.map((card) =>
        ids.includes(card.id) ? { ...card, isMatched: true } : card
      )
    );
    setTimeout(() => playMatchSound(), 300);
  };

  const resetUnmatched = (ids: number[]) => {
    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          ids.includes(card.id) ? { ...card, isFaceUp: false } : card
        )
      );
    }, 500);
  };

  const checkAndResolveMatch = (updatedCards: CardData[]) => {
    const faceUp = updatedCards.filter((c) => c.isFaceUp && !c.isMatched);
    if (faceUp.length !== 2) return;

    const [a, b] = faceUp;

    if (a.value === b.value) {
      markMatched([a.id, b.id]);
    } else {
      resetUnmatched([a.id, b.id]);
    }
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
    setIcons(getRandomEmojisInTheme(iconTheme, icons.length));
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
      className={`flex flex-col justify-center items-center min-h-screen p-3 ${
        state === "win" ? "bg-emerald-900" : "bg-slate-800"
      }`}
    >
      <Board
        cards={cards}
        onCardClicked={handleCardClicked}
        heightRatio={0.8}
      />
      <StatusBar
        gameState={state}
        matchCount={matchCount}
        onNewGameButtonClick={startGame}
      />
    </div>
  );
};

export default Play;
