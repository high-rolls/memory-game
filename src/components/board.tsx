import Card from "@/components/card";
import { useWindowSize } from "@/lib/hooks";
import { squarestSides } from "@/lib/math";
import type { CardData } from "@/lib/types";
import { useMemo } from "react";

export interface IBoardProps {
  cards: CardData[];
  onCardClicked?: (card: CardData) => void;
  heightRatio: number;
}

function Board({ cards, onCardClicked, heightRatio }: IBoardProps) {
  const windowSize = useWindowSize();

  const [smallSide, largeSide] = useMemo(
    () => squarestSides(cards.length),
    [cards]
  );

  const deviceAspectRatio = useMemo(
    () => (windowSize.width > windowSize.height ? "landscape" : "portrait"),
    [windowSize]
  );

  const columns = deviceAspectRatio === "portrait" ? smallSide : largeSide;
  const rows = deviceAspectRatio === "portrait" ? largeSide : smallSide;

  return (
    <div
      className="rounded-md grid gap-1 h-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${columns} / ${rows}`,
        width: `min(100%, ${(heightRatio * 100 * columns) / rows}vh)`,
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
