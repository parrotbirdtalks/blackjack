import classes from "./GameInstruction.module.css";

interface instructionsProps {
  message: string;
}

const GameInstruction = (props: instructionsProps): JSX.Element => {
  return (
    <div className={classes.gameinstruction}>
      <h3>{props.message}</h3>
    </div>
  );
};

export default GameInstruction;
