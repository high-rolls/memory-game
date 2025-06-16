import Card from "@/components/card";
import { useWindowSize } from "@/lib/hooks";
import { squarestSides } from "@/lib/math";
import type { CardData } from "@/lib/types";
import { useMemo } from "react";

export interface IBoardProps {
  cards: CardData[];
  heightRatio: number;
  matchesAreVisible?: boolean;
  onCardClicked?: (card: CardData) => void;
}

function Board({
  cards,
  heightRatio,
  matchesAreVisible = true,
  onCardClicked,
}: IBoardProps) {
  const windowSize = useWindowSize();

  const [smallSide, largeSide] = useMemo(
    () => squarestSides(cards.length),
    [cards.length]
  );

  const deviceAspectRatio = useMemo(
    () => (windowSize.width > windowSize.height ? "landscape" : "portrait"),
    [windowSize]
  );

  const columns = deviceAspectRatio === "portrait" ? smallSide : largeSide;
  const rows = deviceAspectRatio === "portrait" ? largeSide : smallSide;

  return (
    <div
      className="rounded-md grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        aspectRatio: `${columns} / ${rows}`,
        width: `min(100%, ${(heightRatio * 100 * columns) / rows}dvh)`,
      }}
    >
      {cards.map((card) => (
        <Card
          {...card}
          key={card.id}
          isVisible={card.isMatched ? matchesAreVisible : true}
          onClick={onCardClicked ? () => onCardClicked(card) : undefined}
        />
      ))}
    </div>
  );
}

export default Board;
