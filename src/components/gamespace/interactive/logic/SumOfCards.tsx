import GameCard from "../../cardSpace/GameCard";

function SumOfCards(props: GameCard[]): number {
  let sum: number = 0;

  props.map((card) => {
    sum += card.value;
  });

  props.map((card) => {
    if (card.label === "A" && sum <= 11) {
      sum += 10;
    }
  });

  return sum;
}

export default SumOfCards;
