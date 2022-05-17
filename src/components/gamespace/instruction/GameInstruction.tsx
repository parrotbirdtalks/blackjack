import classes from "./GameInstruction.module.css";

const GameInstruction = (props: {message:string}): JSX.Element => {
  return (
    <div className={classes.gameinstruction}>
      <h3>{props.message}</h3>
    </div>
  );
};

export default GameInstruction;
