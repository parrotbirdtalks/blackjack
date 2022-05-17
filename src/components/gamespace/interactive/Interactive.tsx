import { useState } from "react";
import classes from "./interactive.module.css";
import GameState from "../GameState"

interface interactiveProps {
  gameState: GameState
  onStartGame: () => void;
  onHit: () => void;
  onStay: () => void;
  onReset: () => void;
}

const Interactive = (props: interactiveProps): JSX.Element => {
  //to remove button after clicked to prevent spamming
  const [isDisabled, setIsDisabled] = useState(false);
  const disableTime: number = 1000;
  const enableButton = () => {
    setIsDisabled(false);
  };

  const onStartGameHandler = () => {
    setIsDisabled(true);
    props.onStartGame();
    setTimeout(() => {
      enableButton();
    }, disableTime);
  };

  const onHitHandler = () => {
    setIsDisabled(true);
    props.onHit();
    setTimeout(() => {
      enableButton();
    }, disableTime);
  };

  const onStayHandler = () => {
    setIsDisabled(true);
    props.onStay();
    setTimeout(() => {
      enableButton();
    }, disableTime);
  };

  const onResetHandler = () => {
    setIsDisabled(true);
    props.onReset();
    setTimeout(() => {
      enableButton();
    }, disableTime);
  };

  return (
    <div className={classes.interactive}>
      {!props.gameState.isGameStarted && !isDisabled && (
        <button className={classes.button34} onClick={onStartGameHandler}>
          Start Game
        </button>
      )}
      {!props.gameState.isDealersTurn &&
        !props.gameState.isPendingReset &&
        props.gameState.isGameStarted &&
        !isDisabled && (
          <button className={classes.button34} onClick={onHitHandler}>
            Hit
          </button>
        )}
      {!props.gameState.isDealersTurn &&
        !props.gameState.isPendingReset &&
        props.gameState.isGameStarted &&
        !isDisabled && (
          <button className={classes.button34} onClick={onStayHandler}>
            Stay
          </button>
        )}
      {props.gameState.isPendingReset && !isDisabled && (
        <button className={classes.button34} onClick={onResetHandler}>
          Reset Game
        </button>
      )}
    </div>
  );
};

export default Interactive;

// (props.isDealerBusted || props.isPlayerBusted ) &&
