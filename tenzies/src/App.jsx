import './App.css'
import Dice from './components/Dice.jsx'
import { useState } from "react";
import rollDice from "./utility.js"


function App() {
  // Set the original state of the game
  const [frozen, setFrozen] = useState(Array(10).fill(false))
  const [dice, setDice] = useState(() => rollDice(frozen, Array(10).fill(1)));

  // Update the frozen array if user freezes a dice
  function handleDiceClick(idx) {
    setFrozen(prevFrozen =>
      prevFrozen.map((item, i) => (i === idx ? !item : item))
    );
  }

  // Logic for when a user rolls the dice
  function handleDiceRoll() {
  setDice((prevDice) => {
    return rollDice(frozen, [...prevDice]);
  });
}
  
  // Check if the game has been won
  function checkWin() {
    const first = dice[0];
    return dice.every(die => die === first) && frozen.every(Boolean);
  }

  // Restarts the game
  function handleNewGame() {
    const newFrozen = Array(10).fill(false);
    const newDice = rollDice(newFrozen, Array(10).fill(1));

    setFrozen(newFrozen);
    setDice(newDice);
  }

  // Contain all the DOM in this return
  return (
    <main>
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each dice to freeze it at its current value
        between rolls.
      </p>
      <div className="dice-container-div">
        {dice.map((die, idx) => (
          <Dice
            key={idx}
            idx={idx}
            isFrozen={frozen[idx]}
            number={die}
            handleDiceClick={() => handleDiceClick(idx)}
          />
        ))}
      </div>
      <button className="roll-btn" onClick={checkWin() ? handleNewGame : handleDiceRoll}>{checkWin() ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App
