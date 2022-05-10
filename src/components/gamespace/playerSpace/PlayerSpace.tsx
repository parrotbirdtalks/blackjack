import classes from "./PlayerSpace.module.css";
import Avatar from "../Avatar";
import entityInfo from "../EntityInfo";
import GameCard from "../cardSpace/GameCard";
import DisplayCard from "../cardSpace/DisplayCard";
import SumOfCards from "../interactive/logic/SumOfCards";

interface dealCardProps {
  dealCard: GameCard[];
}

const PlayerSpace = (props: dealCardProps): JSX.Element => {
  let sum: number = SumOfCards(props.dealCard);

  //player display information
  let player: entityInfo = {
    isDealer: false,
    image: "zebra",
    totalSum: sum,
  };

  return (
    <div className={classes.playerspace}>
      <div></div>
      <Avatar displayInfo={player} />
      <div className={classes.displaycard}>
        {props.dealCard.map<JSX.Element>((card) => {
          return <DisplayCard key={card.id} card={card} />;
        })}
      </div>
      <div></div>
    </div>
  );
};

export default PlayerSpace;
