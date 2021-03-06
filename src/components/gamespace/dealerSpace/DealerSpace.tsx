import React from "react";
import classes from "./DealerSpace.module.css";
import Avatar from "../Avatar";
import EntityInfo from "../EntityInfo";
import GameCard from "../cardSpace/GameCard";
import DisplayCard from "../cardSpace/DisplayCard";
import SumOfCards from "../interactive/logic/SumOfCards";

interface dealCardProps {
  dealCard: GameCard[];
  isDealersTurn: boolean;
  firstCard: GameCard;
}

const DealerSpace = (props: dealCardProps): JSX.Element => {
  let sum: number | string;
  if (props.isDealersTurn) {
    sum = SumOfCards([props.firstCard, ...props.dealCard]);
  } else {
    sum = "?";
  }

  //dealer display information
  let dealer: EntityInfo = {
    isDealer: true,
    image: "chicken",
    totalSum: sum,
  };

  return (
    <div className={classes.dealerspace}>
      <div></div>
      <div className={classes.displaycard}>
        {props.dealCard.length > 0 && (
          <DisplayCard
            card={props.firstCard}
            toHide={true}
            isDealersTurn={props.isDealersTurn}
          />
        )}
        {props.dealCard.map<JSX.Element>((card) => {
          return <DisplayCard key={card.label + card.suit} card={card} />;
        })}
      </div>
      <Avatar displayInfo={dealer} />
      <div></div>
    </div>
  );
};

export default DealerSpace;
