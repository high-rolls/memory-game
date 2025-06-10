import type { CardData } from "@/lib/types";
import Card from "@/components/card";
import { squarestSides } from "@/lib/math";
import { useEffect, useMemo, useState } from "react";

export interface IBoardProps {
  cards: CardData[];
  onCardClicked?: (card: CardData) => void;
}

function Board({ cards, onCardClicked }: IBoardProps) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [smallSide, largeSide] = useMemo(
    () => squarestSides(cards.length),
    [cards]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const deviceAspectRatio = useMemo(
    () => (windowSize.width > windowSize.height ? "landscape" : "portrait"),
    [windowSize]
  );

  const columns = deviceAspectRatio === "portrait" ? smallSide : largeSide;
  const rows = deviceAspectRatio === "portrait" ? largeSide : smallSide;
  const cellHeightVH = 40 / rows;

  return (
    <div
      className="rounded-md grid gap-2 md:gap-3 h-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${columns} / ${rows}`,
        width: `min(100%, ${(70 * columns) / rows}vh)`,
        fontSize: `${cellHeightVH}vh`,
      }}
    >
      {cards.map((card) => (
        <Card
          {...card}
          key={card.id}
          onClick={onCardClicked ? () => onCardClicked(card) : undefined}
        />
      ))}
    </div>
  );
}

export default Board;
