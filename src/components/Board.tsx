import type { CardData } from "@/lib/types";
import Card from "@/components/card";

export interface IBoardProps {
  cards: CardData[];
  onCardClicked: (card: CardData) => void;
}

const Board = ({ cards, onCardClicked }: IBoardProps) => {
  return (
    <div className="mt-2 rounded-md grid grid-cols-4 gap-3">
      {cards.map((card) => (
        <Card
          {...card}
          key={card.id}
          onClick={() => onCardClicked(card)}
        />
      ))}
    </div>
  );
};

export default Board;
