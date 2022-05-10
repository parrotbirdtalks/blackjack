import { useState, useEffect } from "react";

import classes from "./DisplayCard.module.css";
import GameCard from "./GameCard";

interface CardProps {
  card: GameCard;
  toHide?: boolean;
  isDealersTurn?: boolean;
}

const DisplayCard = (props: CardProps):JSX.Element => {
  const [timeToFlip, setTimetoFlip] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimetoFlip(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={
        props.card.color === "red" ? classes.color_red : classes.color_black
      }
    >
      {(timeToFlip && !props.toHide) || (props.toHide && props.isDealersTurn)? (
        <div className={classes.card}>
          <div className={classes.cardNumber}>{props.card.value}</div>
          <div className={classes.cardSymbol}>{props.card.suit}</div>
        </div>
      ) : (
        <div className={classes.back}></div>
      )}
    </div>
  );
};

export default DisplayCard;
