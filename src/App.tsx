import React from 'react';
import Main from './components/Main';
import classes from './App.module.css'

function App(): JSX.Element {
  return (
    <div className={classes.container}>
      <div></div>
      <Main />
      <div></div>
    </div>
  );
}

export default App;
