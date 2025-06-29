import confettiSfx from "@/assets/audio/confetti-cannon.wav";
import fanfareSfx from "@/assets/audio/victory.mp3";
import matchSfx from "@/assets/audio/blip.mp3";
import ActionBar from "@/components/action-bar";
import Board from "@/components/board";
import StatusBar from "@/components/status-bar";
import { WinModal } from "@/components/win-modal";
import {
  useCurrentLevel,
  useCurrentLevelDispatch,
} from "@/context/level.context";
import { useScoresDispatch } from "@/context/scores.context";
import { useSettings } from "@/context/settings.context";
import { createCardArray } from "@/lib/game";
import { LEVELS } from "@/lib/levels";
import type { CardData } from "@/lib/types";
import JSConfetti from "js-confetti";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import useSound from "use-sound";

export type GameState = "initial" | "displaying-cards" | "playing" | "win";

const confetti = new JSConfetti();

const Play = () => {
  const { iconThemeId, soundVolume } = useSettings();
  const level = useCurrentLevel();
  const levelDispatch = useCurrentLevelDispatch();
  const scoresDispatch = useScoresDispatch();

  const cardCount = level.cardCount;

  const powerCardCount = Math.floor(cardCount / 12);
  const [cards, setCards] = useState<CardData[]>(
    createCardArray(iconThemeId, false, cardCount / 2, powerCardCount, true)
  );
  const [gameState, setGameState] = useState<GameState>("initial");
  const [score, setScore] = useState(0);
  const [scoreChange, setScoreChange] = useState(0);
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

  useEffect(() => {
    if (gameState === "playing" && matchCount === cardCount / 2) {
      const winTimeout = setTimeout(() => {
        setGameState("win");
        const newScore = {
          levelId: level.id,
          score: Math.floor(score),
          iconThemeId,
          date: new Date(),
        };
        scoresDispatch({ type: "add_score", payload: newScore });
        confetti.addConfetti();
        playConfettiSound();
        setTimeout(() => playFanfareSound(), 500);
        navigator.vibrate(200);
      }, 1500);

      return () => clearTimeout(winTimeout);
    }
  }, [
    cardCount,
    gameState,
    iconThemeId,
    level.id,
    matchCount,
    playConfettiSound,
    playFanfareSound,
    score,
    scoresDispatch,
  ]);

  const resetBoard = useCallback(() => {
    const newCards = createCardArray(
      iconThemeId,
      false,
      cardCount / 2,
      powerCardCount,
      true
    );
    setCards(newCards);
    setScore(0);
    setScoreChange(0);
    setRevealAbilityCount(0);
    setDisplaySeconds(0);
  }, [cardCount, iconThemeId, powerCardCount]);

   useLayoutEffect(() => {
    resetBoard();
    setGameState("initial");
  }, [level.id, resetBoard]);

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
    resetBoard();
    revealCards(cardCount * 0.2);
  };

  const useRevealAbility = () => {
    revealCards(5);
    setRevealAbilityCount((prev) => prev - 1);
  };

  const handleNextLevelClick = () => {
    const nextLevel = LEVELS.find((l) => l.id === level.id + 1);
    if (nextLevel) {
      setGameState("initial");
      setTimeout(() => {
        levelDispatch(nextLevel.id);
      }, 200);
    }
  };

  const handleReplayClick = () => {
    setGameState("initial");
    resetBoard();
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
      <WinModal
        isOpen={gameState === "win"}
        levelId={level.id}
        score={Math.floor(score)}
        onNextLevelClick={handleNextLevelClick}
        onReplayClick={handleReplayClick}
      />
    </div>
  );
};

export default Play;
