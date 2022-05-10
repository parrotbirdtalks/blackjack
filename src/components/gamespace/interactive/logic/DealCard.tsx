import GameCard from "../../cardSpace/GameCard";

function DealCard(cardPool: GameCard[]): GameCard {
  const newCard: GameCard =
    cardPool[Math.floor(Math.random() * cardPool.length)];
  return newCard;
}

export default DealCard;
