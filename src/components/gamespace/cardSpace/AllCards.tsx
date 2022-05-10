import GameCard from "./GameCard";

const allValues: string[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const allSuits: string[] = ["♠", "♥", "♣", "♦"];
let AllCards: GameCard[] = [];
for (let value in allValues) {
  for (let suit in allSuits) {
    let color: string;
    if (allSuits[suit] === "♠" || allSuits[suit] === "♣") {
      color = "black";
    } else {
      color = "red";
    }
    let newCard: GameCard = {
      id: AllCards.length,
      value: allValues[value],
      suit: allSuits[suit],
      color: color,
    };
    // console.log(AllCards);
    AllCards.push(newCard);
  }
}

export default AllCards;
