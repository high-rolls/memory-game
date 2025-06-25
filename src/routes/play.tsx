import confettiSfx from "@/assets/audio/confetti-cannon.wav";
import fanfareSfx from "@/assets/audio/kazoo-fanfare.wav";
import matchSfx from "@/assets/audio/match.ogg";
import ActionBar from "@/components/action-bar";
import Board from "@/components/board";
import StatusBar from "@/components/status-bar";
import { useSettingsFull } from "@/context/settings";
import { createCardArray } from "@/lib/game";
import type { CardData } from "@/lib/types";
import type { Score } from "@/routes/scores";
import JSConfetti from "js-confetti";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSound from "use-sound";
import { useLocalStorage } from "usehooks-ts";

export type GameState = "initial" | "displaying-cards" | "playing" | "win";

const confetti = new JSConfetti();

const Play = () => {
  const { iconTheme, soundVolume } = useSettingsFull();
  const { cardCountParam } = useParams();
  const cardCount = cardCountParam ? parseInt(cardCountParam) : 12;
  const powerCardCount = Math.floor(cardCount / 12);
  const [cards, setCards] = useState<CardData[]>(
    createCardArray(iconTheme, false, cardCount / 2, powerCardCount, true)
  );
  const [gameState, setGameState] = useState<GameState>("initial");
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(0);
  const [scores, setScores] = useLocalStorage<Score[]>("scores", []);
  const [, setStateTimer] = useState(0);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [revealAbilityCount, setRevealAbilityCount] = useState(0);

  const [playMatchSound] = useSound(matchSfx, { volume: soundVolume });
  const [playConfettiSound] = useSound(confettiSfx, { volume: soundVolume });
  const [playFanfareSound] = useSound(fanfareSfx, { volume: soundVolume });

  useEffect(() => {
    if (gameState !== "displaying-cards") return;

    const id = setInterval(() => {
      setStateTimer((prev) => {
        const next = prev - 200;
        setDisplaySeconds(Math.ceil(next / 1000)); // update only if it changes
        if (next <= 0) {
          clearInterval(id);
          setCards((prev) =>
            prev.map((card) => ({ ...card, isFaceUp: card.isMatched }))
          );
          setGameState("playing");
          return 0;
        }
        return next;
      });
    }, 200);

    return () => clearInterval(id);
  }, [gameState]);

  const matchCount = cards.filter((card) => card.isMatched).length / 2;

  if (gameState === "playing" && matchCount === cardCount / 2) {
    setTimeout(() => {
      setGameState("win");
      const newScore = {
        cardCount,
        score: Math.floor(score),
        iconTheme,
        date: new Date(),
      };
      setScores([...scores, newScore]);
      confetti.addConfetti();
      playConfettiSound();
      setTimeout(() => playFanfareSound(), 500);
      navigator.vibrate(200);
    }, 1500);
  }

  const markMatched = (ids: number[], updatedCards: CardData[]) => {
    let matchScore = 0;
    ids.forEach((id) => {
      const cardById = updatedCards.find((card) => card.id === id);
      if (cardById) {
        matchScore += 100 / cardById.timesSeen;
      }
    });
    const isPowerPair =
      updatedCards.find((card) => card.id === ids[0])?.isPowerCard ?? false;
    if (isPowerPair) setRevealAbilityCount((prev) => prev + 1);
    setScore((prev) => prev + matchScore);
    setScoreChange(matchScore);
    setCards((prev) =>
      prev.map((card) =>
        ids.includes(card.id) ? { ...card, isMatched: true } : card
      )
    );
    setTimeout(() => {
      playMatchSound();
      navigator.vibrate(100);
    }, 300);
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

    if (a.emoji === b.emoji) {
      markMatched([a.id, b.id], updatedCards);
    } else {
      resetUnmatched([a.id, b.id]);
    }
  };

  const handleCardClicked = (clickedCard: CardData) => {
    if (gameState !== "playing") return;
    if (clickedCard.isFaceUp || clickedCard.isMatched) return;

    const currentlyFaceUp = cards.filter((c) => c.isFaceUp && !c.isMatched);
    if (currentlyFaceUp.length >= 2) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id
        ? { ...card, isFaceUp: true, timesSeen: clickedCard.timesSeen + 1 }
        : card
    );
    setCards(updatedCards);

    if (currentlyFaceUp.length === 1) {
      checkAndResolveMatch(updatedCards);
    }
  };

  const revealCards = (duration: number) => {
    setCards((prev) => prev.map((card) => ({ ...card, isFaceUp: true })));
    setGameState("displaying-cards");
    setStateTimer(duration * 1000);
    setDisplaySeconds(Math.ceil(duration));
  };

  const startGame = () => {
    const newCards = createCardArray(
      iconTheme,
      false,
      cardCount / 2,
      powerCardCount,
      true
    );
    setCards(newCards);
    setScore(0);
    revealCards(cardCount * 0.2);
    setRevealAbilityCount(0);
  };

  const useRevealAbility = () => {
    revealCards(5);
    setRevealAbilityCount((prev) => prev - 1);
  };

  return (
    <div
      className={`flex flex-col justify-evenly items-center gap-3 h-full p-3 ${
        gameState === "win" ? "bg-success/25" : "bg-base-100"
      }`}
    >
      <StatusBar
        displaySeconds={displaySeconds}
        gameState={gameState}
        score={score}
        scoreChange={scoreChange}
      />
      <Board
        cards={cards}
        hideMatchedCards={["playing", "displaying-cards"].includes(gameState)}
        onCardClicked={handleCardClicked}
      />
      <ActionBar
        gameState={gameState}
        revealAbilityCount={revealAbilityCount}
        onNewGameButtonClick={startGame}
        onRevealAllButtonClick={useRevealAbility}
      />
    </div>
  );
};

export default Play;
