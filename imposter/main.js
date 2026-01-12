// Variable Declarations
const fruitEmojis = [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍋‍🟩", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", 
    "🍒", "🍑", "🥭", "🍍", "🥥", "🥝" 
];

const fruityColors = [
    '#FF6B6B', // Watermelon
    '#FFA500', // Orange
    '#FFD700', // Banana yellow
    '#32CD32', // Lime green
    '#90EE90', // Green apple
    '#FF1493', // Dragon fruit 
    '#DA70D6', // Passionfruit 
    '#9370DB', // Grape 
    '#FF69B4', // Raspberry 
    '#00CED1'  // Blueberry 
];

const fruitDisplayDiv = document.getElementById('fruits-display');
const helpBtn = document.getElementById('help-btn');
const helpCloseBtn = document.getElementById('help-close-btn');
const instructionDisplayDiv = document.getElementById('instructions-display');
const helpDisplaySection = document.getElementById('help');
const startBtn = document.getElementById('start-btn');
const gameSection = document.getElementById('game');
const homePageSection = document.getElementById('home-page');
const headerSection = document.querySelector('header');
const playerSizeInput = document.getElementById('player-size-input');
const endBtn = document.getElementById('end-btn');

// Event Listeners
helpBtn.addEventListener('click', renderInstructions);
helpCloseBtn.addEventListener('click', hideInstructions);
startBtn.addEventListener('click', startGame);
endBtn.addEventListener('click', endGame);

// Function Logic

/**
 * This is the child function for event listener where help-btn is pressed
 * 
 * @returns {void}
 */
function renderInstructions() {
    helpBtn.style.display = 'none';
    helpDisplaySection.style.display = 'inline';
    return;
}

/**
 * This is the child function for event listener where help-close btn is pressed
 * 
 * @returns {void}
 */
function hideInstructions() {
    helpBtn.style.display = "inline";
    helpDisplaySection.style.display = "none";
    return;
}


/**
 * This function will randomly return a fruit
 * 
 * @returns {string} A fruit emoji
 */
function getRandomFruit() {
    return fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
}

/**
 * This function will update the div to display a new fruit
 * 
 * @returns {void}
 */
function renderHomePageFruit() {
    if (homePageSection.style.display != 'none') {
        const fruit = getRandomFruit();
    
        fruitDisplayDiv.textContent = fruit;
        setTimeout(renderHomePageFruit, 1000);
    }
    return;
}

/**
 * This function starts the game and renders the game elements
 * 
 * @returns {void}
 */
function startGame() {
    const numPlayers = playerSizeInput.value;

    if (!numPlayers || (numPlayers < 3 || numPlayers > 8)) {
        // Error Logic in Here
        return;
    }

    const players = playerSetUp(numPlayers);
    renderGamePage(players);

    return;
}

/**
 * Will create all players, give them their roles and return it as an array
 * @param {int} n - The number of players
 * 
 * @returns {Array}
 */
function playerSetUp(n) {
    const civilianFruit = getRandomFruit();
    const playersArray = [];

    // Make every player a civilian first
    for (let i = 1; i <= n; i++) {
        const player = {
            name: "Player " + `${i}`,
            role: "civilian",
            fruit: civilianFruit
        };
        playersArray.push(player);
    }

    // Choose a random index and make that player imposter
    const randIndx = Math.floor(Math.random() * n);
    playersArray[randIndx].role = "imposter";
    playersArray[randIndx].fruit = "";
    
    console.log(playersArray);

    return playersArray;
}

/**
 * Renders elements of game page for game start
 * @param {Array} players - The array of players and their information
 * 
 * @returns {void}
 */
function renderGamePage(players) {
    // Hide Home Page Elements
    helpBtn.style.display = 'none';
    helpDisplaySection.style.display = 'none';
    headerSection.style.display = 'none';
    homePageSection.style.display = 'none';

    // Reveal game page
    gameSection.style.display = 'flex';

    // Build players list
    let i = 0;
    let cards = "";
    for (const player of players) {
        let playerCardElement;
        if (player.role == "civilian") {
            playerCardElement = document.createElement('div');
            playerCardElement.className = "civilian-card player-card";
            playerCardElement.id = `card-${i}`;
            playerCardElement.textContent = player.name;
            playerCardElement.onclick = () => revealCard(playerCardElement, player.fruit);

        } else if (player.role == "imposter") {
            playerCardElement = document.createElement('div');
            playerCardElement.className = "imposter-card player-card";
            playerCardElement.id = `card-${i}`;
            playerCardElement.textContent = player.name;
            playerCardElement.onclick = () => revealCard(playerCardElement, '');
        }
        playerCardElement.style.backgroundColor = fruityColors[i];
        i++;
        gameSection.appendChild(playerCardElement);
    }
    return;
}

/**
 * Reveals and deletes player card when clicked on
 * @param {Element} playerCardElement - The element of the player card
 * @param {string} fruit - The fruit of the player card
 * 
 * @returns {void}
 */
function revealCard(playerCardElement, fruit) {
    if (!fruit) {
        playerCardElement.textContent = "YOU ARE IMPOSTER!";
    } else {
        playerCardElement.textContent = `YOU ARE CIVILIAN, ${fruit}`
    }
    setTimeout(() => {deleteCard(playerCardElement)}, 3 * 1000);
    return;
}

/**
 * Will delete a card once it is read
 * @param {Element} playerCardElement
 * 
 * @returns {void}
 */
function deleteCard(playerCardElement) {
    playerCardElement.style.display = 'none';
    return;
}

/**
 * Ends the game by rerendering home page
 */
function endGame() {
    // Clear game section
    gameSection.style.display = 'none';
    gameSection.innerHTML = '';
    gameSection.append(endBtn);

    // Render home page section
    helpBtn.style.display = 'flex';
    headerSection.style.display = 'flex';
    homePageSection.style.display = 'flex';
    renderHomePageFruit();
}

// Function Calls
renderHomePageFruit();