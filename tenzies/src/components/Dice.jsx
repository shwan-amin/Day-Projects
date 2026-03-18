export default function Dice({ number, handleDiceClick, idx, isFrozen }) {
  const diceClass = isFrozen ? "dice dice-frozen" : "dice";

  return (
    <div className={diceClass} onClick={handleDiceClick} id={idx}>
      {number}
    </div>
  );
}