import { useState, useEffect } from "react";
import classes from "./GameSpace.module.css";
import { Header, Footer } from "./header-footer/HeaderFooter";
import GameInstruction from "./instruction/GameInstruction";
import DealerSpace from "./dealerSpace/DealerSpace";
import PlayerSpace from "./playerSpace/PlayerSpace";
import Interactive from "./interactive/Interactive";
import AllCards from "./cardSpace/AllCards";
import GameCard from "./cardSpace/GameCard";
import DealCard from "./interactive/logic/DealCard";
import SumOfCards from "./interactive/logic/SumOfCards";

const GameSpace = (): JSX.Element => {
  const [cardPool, setCardPool] = useState<Array<GameCard>>(AllCards); // current deck of cards
  const [isGameStarted, setIsGameStart] = useState(false); //true after START GAME is selected; to make sure no unexpected rendering before game starts
  const [message, setMessage] = useState("Do you want to play a round?"); // instructions for player
  const [dealerFirstCard, setDealerFirstCard] = useState<GameCard>(); //used for making the first dealer card face down
  const [dealersCards, setDealersCards] = useState<Array<GameCard>>([]); //dealer's cards
  const [dealerSum, setDealerSum] = useState(0); //dealyer's card value total
  const [playersCards, setPlayersCards] = useState<Array<GameCard>>([]); //player's cards
  const [playerSum, setPlayerSum] = useState(0); //player's card value total
  const [isDealersTurn, setIsDealersTurn] = useState(false); //true when player gets blackjack or chose stay
  const [isPlayersTurn, setIsPlayersTurn] = useState(false); //true when player's turn to choose hit or stay
  const [isPendingReset, setIsPendingReset] = useState(false); //tue when game is over, pending initization of states

  const STARTGAME = (): void => {
    setIsGameStart(true);
    let tempCardPool: GameCard[] = [...cardPool];
    let newPlayerCard1: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newPlayerCard1);
    let newPlayerCard2: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newPlayerCard2);
    let newDealerCard1: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newDealerCard1);
    let newDealerCard2: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newDealerCard2);
    setPlayersCards([...playersCards, newPlayerCard1, newPlayerCard2]);
    setDealerFirstCard(newDealerCard1);
    setDealersCards([...dealersCards, newDealerCard2]);
    setCardPool(tempCardPool);
    setPlayerSum(SumOfCards([newPlayerCard1, newPlayerCard2]));
    // setPlayerSum(21)
    setDealerSum(SumOfCards([newDealerCard1, newDealerCard2]));
  };

  const HIT = (): void => {
    setIsPlayersTurn(false);
    let tempCardPool: GameCard[] = [...cardPool];
    let newPlayerCard: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newPlayerCard);
    setPlayersCards([...playersCards, newPlayerCard]);
    setCardPool(tempCardPool);
    setPlayerSum(SumOfCards([...playersCards, newPlayerCard]));
    console.log(newPlayerCard);
  };

  const STAY = (): void => {
    setIsDealersTurn(true);
    setIsPlayersTurn(false);
  };

  const RESET = (): void => {
    setCardPool(AllCards);
    setIsGameStart(false);
    setMessage("Do you want to play a round?");
    setDealersCards([]);
    setDealerSum(0);
    setPlayersCards([]);
    setPlayerSum(0);
    setIsDealersTurn(false);
    setIsPendingReset(false);
  };

  //Dealer's actions after player stay or blackjack
  const dealerAction = (): void => {
    setMessage("Dealer's Turn");
    let tempCardPool: GameCard[] = [...cardPool];
    let newDealerCard: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newDealerCard);
    setTimeout(() => {
      setDealersCards([...dealersCards, newDealerCard]);
      setCardPool(tempCardPool);
      setDealerSum(
        SumOfCards([...dealersCards, dealerFirstCard!, newDealerCard])
      );
    }, 1000);
    console.log(newDealerCard);
  };

  //Card logic for player
  useEffect(() => {
    if (isGameStarted) {
      if (playerSum === 21) {
        setTimeout(() => {
          setMessage("Blackjack!");
          setIsDealersTurn(true);
        }, 750);
      } else if (playerSum > 21) {
        setTimeout(() => {
          setMessage("Bust! Game Over");
        }, 750);
        setIsPendingReset(true);
      } else {
        setIsPlayersTurn(true);
        setTimeout(() => {
          setMessage("Do you want to hit or stay?");
        }, 750);
      }
    }
  }, [playerSum]);

  //Card logic for dealer
  useEffect(() => {
    if (isDealersTurn) {
      if (dealerSum > 21) {
        setTimeout(() => {
          setMessage("You Win!");
          setIsPendingReset(true);
        }, 1000);
      } else if (dealerSum === playerSum && dealerSum > 17) {
        setTimeout(() => {
          setMessage("Draw!");
          setIsPendingReset(true);
        }, 1000);
      } else if (dealerSum > playerSum) {
        setTimeout(() => {
          setMessage("You Lose!");
          setIsPendingReset(true);
        }, 1000);
      } else if (dealerSum < playerSum && dealerSum < 17) {
        dealerAction();
      } else {
        setTimeout(() => {
          setMessage("You Win!");
          setIsPendingReset(true);
        }, 1000);
      }
    }
  }, [dealerSum, isDealersTurn]);

  console.log("playerSum: " + playerSum);
  console.log(playersCards);
  console.log("dealerSum: " + dealerSum);
  console.log(dealersCards);

  return (
    <div className={classes.gamespace}>
      <Header />
      <GameInstruction message={message} />
      <DealerSpace
        dealCard={dealersCards}
        isDealersTurn={isDealersTurn}
        firstCard={dealerFirstCard!}
      />
      <PlayerSpace dealCard={playersCards} />
      <Interactive
        isGameStarted={isGameStarted}
        isPlayersTurn={isPlayersTurn}
        isDealersTurn={isDealersTurn}
        isPendingReset={isPendingReset}
        onStartGame={STARTGAME}
        onHit={HIT}
        onStay={STAY}
        onReset={RESET}
      />
      <Footer />
    </div>
  );
};

export default GameSpace;
