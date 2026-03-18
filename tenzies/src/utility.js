// Roll a die for each unfrozen die (boolean false = not frozen, true = frozen)
export default function rollDice(frozenArray, diceSet) {
    for (let i = 0; i < frozenArray.length; i++) {
        if (!frozenArray[i]) {
            diceSet[i] = Math.floor(Math.random() * 6) + 1;
        }
    }
    return diceSet;
}