import classes from "./HeaderFooter.module.css";

export const Header = (): JSX.Element => {
  return (
    <div className={classes.title}>
      <h1>BLACKJACK</h1>
      <h6>Version 4.0</h6>
    </div>
  );
};

export const Footer = (): JSX.Element => {
  return (
    <div className={classes.footer}>
      <h6 className={classes.someMessage}>Created with React-ts</h6>
      <div></div>
      <h5 className={classes.copyright}>
        ©2022&nbsp;
        <span className={classes.me}>XY</span>
      </h5>
    </div>
  );
};
