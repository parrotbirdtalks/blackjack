import classes from "./App.module.css";
import GameSpace from "./components/gamespace/GameSpace";

function App(): JSX.Element {
  return (
    <div className={classes.container}>
      <GameSpace />
    </div>
  );
}

export default App;
