import classes from './App.module.css'
import GameSpace from './components/gamespace/GameSpace';

function App(): JSX.Element {
  return (
    <div className={classes.container}>
      <div></div>
      <div className={classes.main}>
        <div></div>
        <GameSpace />
        <div></div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
