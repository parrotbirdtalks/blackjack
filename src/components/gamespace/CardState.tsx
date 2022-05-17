import GameCard from "./cardSpace/GameCard";

interface CardState {
  cards: GameCard[];
  sum: number;
  dealerFirstCard?: GameCard;
}

export default CardState;
