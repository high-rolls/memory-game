import confettiSfx from "@/assets/audio/confetti-cannon.wav";
import fanfareSfx from "@/assets/audio/kazoo-fanfare.wav";
import matchSfx from "@/assets/audio/match.ogg";
import ActionBar from "@/components/action-bar";
import Board from "@/components/board";
import StatusBar from "@/components/status-bar";
import { useGameSettingsFull, type IconTheme } from "@/context/game-settings";
import { createCardArray } from "@/lib/game";
import { getRandomEmojisInTheme, themeEmojis } from "@/lib/themes";
import type { CardData } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import JSConfetti from "js-confetti";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export type GameState = "initial" | "displaying-cards" | "playing" | "win";

const confetti = new JSConfetti();

const Play = () => {
  const { cardCount, iconTheme, icons, setIcons } = useGameSettingsFull();
  const powerCardCount = Math.floor(cardCount / 12);
  const [cards, setCards] = useState<CardData[]>(
    createCardArray(cardCount / 2, powerCardCount, false)
  );
  const [gameState, setGameState] = useState<GameState>("initial");
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(0);
  const [, setStateTimer] = useState(0);
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [revealAbilityCount, setRevealAbilityCount] = useState(0);

  const [playMatchSound] = useSound(matchSfx);
  const [playConfettiSound] = useSound(confettiSfx);
  const [playFanfareSound] = useSound(fanfareSfx);

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
      confetti.addConfetti();
      playConfettiSound();
      setTimeout(() => playFanfareSound(), 500);
      navigator.vibrate(200);
    }, 500);
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

    if (a.value === b.value) {
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
    const otherThemes = Object.keys(themeEmojis).filter(
      (k) => k !== iconTheme
    ) as IconTheme[];
    // Pick power icons randomly from other themes
    const powerIcons = new Array(powerCardCount).fill("").map(() => {
      const randomTheme =
        otherThemes[Math.floor(Math.random() * otherThemes.length)];
      return getRandomEmojisInTheme(randomTheme, 1)[0];
    });

    setIcons([
      ...powerIcons,
      ...getRandomEmojisInTheme(iconTheme, icons.length - powerCardCount),
    ]);

    const shuffled = shuffleArray(cards).map((card) => ({
      ...card,
      isMatched: false,
      timesSeen: 0,
    }));
    setCards(shuffled);
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
        gameState === "win" ? "bg-emerald-950" : "bg-base-200"
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
        heightRatio={0.7}
        matchesAreVisible={gameState !== "displaying-cards"}
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
