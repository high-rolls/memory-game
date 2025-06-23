import Card from "@/components/card";
import { useWindowSize } from "@/lib/hooks";
import { squarestSides } from "@/lib/math";
import type { CardData } from "@/lib/types";
import { useMemo, useRef } from "react";

export interface IBoardProps {
  cards: CardData[];
  hideMatchedCards: boolean;
  onCardClicked?: (card: CardData) => void;
}

function Board({
  cards,
  hideMatchedCards,
  onCardClicked,
}: IBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const [smallSide, largeSide] = useMemo(
    () => squarestSides(cards.length),
    [cards.length]
  );

  const deviceAspectRatio = useMemo(
    () => windowSize.width / windowSize.height,
    [windowSize]
  );

  const columns = deviceAspectRatio > 1 ? largeSide : smallSide;
  const rows = deviceAspectRatio > 1 ? smallSide : largeSide;
  const containerWidth = containerRef.current ? containerRef.current.clientWidth : 99999;

  return (
    <div className="relative flex-1 w-full">
      <div
        className="absolute top-0 left-0 bottom-0 right-0"
        ref={containerRef}
      >
        <div className="flex flex-col justify-center h-full">
          <div
            className="rounded-md grid gap-1 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              aspectRatio: `${columns} / ${rows}`,
              height: `min(100%, ${(containerWidth * rows) / columns}px)`,
            }}
          >
            {cards.map((card) => (
              <Card
                {...card}
                key={card.id}
                hideMatched={hideMatchedCards}
                onClick={onCardClicked ? () => onCardClicked(card) : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
