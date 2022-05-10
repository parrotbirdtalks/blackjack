import classes from "./Avatar.module.css";
import entityInfo from "./EntityInfo";

interface EntityProps {
  displayInfo: entityInfo;
}

const Avatar = (props: EntityProps): JSX.Element => {
  return (
    <div className={classes.avatar}>
      {props.displayInfo.image === "zebra" ? (
        <img src={require("../../assets/zebra_avatar.png")} alt="Dealer" />
      ) : (
        <img src={require("../../assets/chicken_avatar.png")} alt="Dealer" />
      )}
      {props.displayInfo.isDealer === true ? (
        <h4>Dealer's Sum: </h4>
      ) : (
        <h4>Player's Sum: </h4>
      )}
      <h4>{props.displayInfo.totalSum}</h4>
    </div>
  );
};

export default Avatar;
