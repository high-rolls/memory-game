import type { CardColor } from "@/context/settings.context";

export interface ICardPreviewProps {
  cardColor: CardColor;
}

export function CardPreview({ cardColor }: ICardPreviewProps) {
  return (
    <div
      className={`aspect-square rounded-sm bg-linear-to-br shadow border-1 border-${cardColor}-700 from-${cardColor}-500 to-${cardColor}-600`}
    ></div>
  );
}
