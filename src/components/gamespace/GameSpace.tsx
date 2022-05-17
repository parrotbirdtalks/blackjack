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
import GameState from "./GameState";
import CardState from "./CardState";

const GameSpace = (): JSX.Element => {
  const [cardPool, setCardPool] = useState<Array<GameCard>>(AllCards()); // current deck of cards
  const [gameState, setGameState] = useState<GameState>({
    isGameStarted: false, //true after STARTGAME; to make sure no unexpected rendering before game starts
    isDealersTurn: false, //true when player gets blackjack or chose stay
    isPendingReset: false, //true when game is over, pending initization of states
  });
  const [message, setMessage] = useState("Do you want to play a round?"); // instructions for player
  const [dealersCardState, setDealersCardState] = useState<CardState>({
    cards: [], //dealer's cards
    sum: 0, //dealer's card value total
    //dealerFirstCard: //used for making the first dealer card face down
  });
  const [playersCardState, setPlayersCardState] = useState<CardState>({
    cards: [], //player's cards
    sum: 0, //player's card value total
  });

  const STARTGAME = (): void => {
    setGameState((prevState) => ({ ...prevState, isGameStarted: true }));
    let tempCardPool: GameCard[] = [...cardPool];
    let newPlayerCard1: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newPlayerCard1);
    let newPlayerCard2: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newPlayerCard2);
    let newDealerCard1: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newDealerCard1);
    let newDealerCard2: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newDealerCard2);
    setPlayersCardState({
      cards: [...playersCardState.cards, newPlayerCard1, newPlayerCard2],
      sum: SumOfCards([newPlayerCard1, newPlayerCard2]),
    });
    setDealersCardState({
      dealerFirstCard: newDealerCard1,
      cards: [...dealersCardState.cards, newDealerCard2],
      sum: SumOfCards([newDealerCard1, newDealerCard2]),
    });
    setCardPool(tempCardPool);
  };

  const HIT = (): void => {
    let tempCardPool: GameCard[] = [...cardPool];
    let newPlayerCard: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newPlayerCard);
    setPlayersCardState({
      cards: [...playersCardState.cards, newPlayerCard],
      sum: SumOfCards([...playersCardState.cards, newPlayerCard]),
    });
    setCardPool(tempCardPool);
    console.log(newPlayerCard);
  };

  const STAY = (): void => {
    setGameState((prevState) => ({ ...prevState, isDealersTurn: true }));
  };

  const RESET = (): void => {
    setCardPool(AllCards);
    setGameState({
      isGameStarted: false,
      isDealersTurn: false,
      isPendingReset: false,
    });
    setMessage("Do you want to play a round?");
    setDealersCardState({
      cards: [],
      sum: 0
    })
    setPlayersCardState({
      cards: [],
      sum: 0,
    });
  };

  //Dealer's actions after player stay or blackjack
  const dealerAction = (): void => {
    setMessage("Dealer's Turn");
    let tempCardPool: GameCard[] = [...cardPool];
    let newDealerCard: GameCard = DealCard(tempCardPool);
    tempCardPool = tempCardPool.filter((card) => card !== newDealerCard);
    setTimeout(() => {
      setDealersCardState((prevState) => ({
        ...prevState,
        cards: [...dealersCardState.cards, newDealerCard],
        sum: SumOfCards([
          ...dealersCardState.cards,
          dealersCardState.dealerFirstCard!,
          newDealerCard,
        ]),
      }));
      setCardPool(tempCardPool);
    }, 1000);
    console.log(newDealerCard);
  };

  //Card logic for player
  useEffect(() => {
    if (gameState.isGameStarted) {
      if (playersCardState.sum === 21) {
        setTimeout(() => {
          setMessage("Blackjack!");
          setGameState((prevState) => ({ ...prevState, isDealersTurn: true }));
        }, 750);
        // setTimeout(() => {
        //   setIsDealersTurn(true);
        // }, 1250);
      } else if (playersCardState.sum > 21) {
        setTimeout(() => {
          setMessage("Bust! Game Over");
        }, 750);
        setGameState((prevState) => ({ ...prevState, isPendingReset: true }));
      } else {
        setTimeout(() => {
          setMessage("Do you want to hit or stay?");
        }, 750);
      }
    }
  }, [playersCardState.sum]);

  //Card logic for dealer
  useEffect(() => {
    if (gameState.isDealersTurn) {
      if (dealersCardState.sum > 21) {
        setTimeout(() => {
          setMessage("You Win!");
          setGameState((prevState) => ({ ...prevState, isPendingReset: true }));
        }, 1000);
      } else if (
        dealersCardState.sum === playersCardState.sum &&
        dealersCardState.sum > 17
      ) {
        setTimeout(() => {
          setMessage("Draw!");
          setGameState((prevState) => ({ ...prevState, isPendingReset: true }));
        }, 1000);
      } else if (dealersCardState.sum > playersCardState.sum) {
        setTimeout(() => {
          setMessage("You Lose!");
          setGameState((prevState) => ({ ...prevState, isPendingReset: true }));
        }, 1000);
      } else if (
        dealersCardState.sum < playersCardState.sum &&
        dealersCardState.sum < 17
      ) {
        dealerAction();
      } else {
        setTimeout(() => {
          setMessage("You Win!");
          setGameState((prevState) => ({ ...prevState, isPendingReset: true }));
        }, 1000);
      }
    }
  }, [dealersCardState.sum, gameState.isDealersTurn]);

  console.log("playerSum: " + playersCardState.sum);
  console.log(playersCardState.cards);
  console.log("dealerSum: " + dealersCardState.sum);
  console.log(dealersCardState.cards);

  return (
    <div className={classes.gamespace}>
      <Header />
      <GameInstruction message={message} />
      <DealerSpace
        dealCard={dealersCardState.cards}
        isDealersTurn={gameState.isDealersTurn}
        firstCard={dealersCardState.dealerFirstCard!}
      />
      <PlayerSpace dealCard={playersCardState.cards} />
      <Interactive
        gameState={gameState}
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
