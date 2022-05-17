import GameCard from "./GameCard";

const allLabels: string[] = [
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

const allSuits: { suit: string; color: string }[] = [
  { suit: "♠", color: "black" },
  { suit: "♥", color: "red" },
  { suit: "♣", color: "black" },
  { suit: "♦", color: "red" },
];

const getValue = (value: string): number => {
  switch (value) {
    case "A":
      return 1;
    case "J":
    case "Q":
    case "K":
      return 10;
    default:
      return parseInt(value);
  }
};

const AllCards = (): GameCard[] => {
  let cardArray: GameCard[] = [];
  allSuits.map((suitAndColor) =>
    allLabels.map((label) => {
      cardArray.push({
        label,
        value: getValue(label),
        suit: suitAndColor.suit,
        color: suitAndColor.color,
      });
    })
  );
  return cardArray;
};

// const SetOfCards: GameCard[][] = allSuits.map((suitAndColor) =>
//   allLabels.map((label) => ({
//     label,
//     value: getValue(label),
//     suit: suitAndColor.suit,
//     color: suitAndColor.color,
//   }))
// );
// const AllCard: GameCard[] = [
//   ...SetOfCards[0],
//   ...SetOfCards[1],
//   ...SetOfCards[2],
//   ...SetOfCards[3],
// ];

export default AllCards;
