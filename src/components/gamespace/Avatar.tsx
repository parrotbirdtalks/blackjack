import classes from "./Avatar.module.css";
import EntityInfo from "./EntityInfo";

const Avatar = (props: { displayInfo: EntityInfo }): JSX.Element => {
  return (
    <div className={classes.avatar}>
      <img
        src={require(`../../assets/${props.displayInfo.image}_avatar.png`)}
        alt="Dealer"
      />
      <h4>{props.displayInfo.isDealer === true ? "Dealer" : "Player"}'s Sum: </h4>
      <h4>{props.displayInfo.totalSum}</h4>
    </div>
  );
};

export default Avatar;
