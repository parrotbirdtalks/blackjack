import GameSpace from "./gamespace/GameSpace";
import classes from "./Main.module.css";

const Main = () => {
  return (
    <div className={classes.main}>
      <div></div>
      <GameSpace />
      <div></div>
    </div>
  );
};

export default Main;