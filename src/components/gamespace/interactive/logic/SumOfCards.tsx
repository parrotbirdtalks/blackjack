import GameCard from "../../cardSpace/GameCard";

function SumOfCards(props: GameCard[]): number {
  let sum: number = 0;
  for (let i = 0; i < props.length; i++) {
    if (
      props[i].value === "J" ||
      props[i].value === "Q" ||
      props[i].value === "K"
    ) {
      sum += 10;
    } else if (props[i].value === "A") {
      sum += 1;
    } else {
      sum += +props[i].value;
    }
  }

  for (let j = 0; j < props.length; j++) {
    if (props[j].value === "A" && sum <= 11) {
      sum += 10;
    }
  }
  return sum;
}

export default SumOfCards;
