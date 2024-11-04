const gameBoard = document.getElementById("gameBoard");
const messageOverlay = document.getElementById("messageOverlay");
const playAgainBtn = document.getElementById("playAgainBtn");
const restartButton = document.getElementById("restartButton");

let cardValues = [];
let cardElements = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Generate card values (pairs)
function generateCardValues() {
    const images = ['🍎', '🍌', '🍇', '🍊', '🍒', '🍉', '🍍', '🍓', '🥝', '🍋'];
    cardValues = [...images, ...images];
    shuffleCards();
}

// Shuffle cards
function shuffleCards() {
    cardValues.sort(() => Math.random() - 0.5);
}

// Create cards
function createCards() {
    cardValues.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.innerHTML = `<span>${value}</span>`;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
        cardElements.push(card);
    });
}

// Flip card
function flipCard() {
    if (lockBoard || this.classList.contains("matched") || this === firstCard) return;

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Check for matching cards
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;
        resetBoard();

        if (matchedPairs === cardValues.length / 2) {
            setTimeout(showMessage, 500);
        }
    } else {
        unflipCards();
    }
}

// Unflip cards if not a match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

// Reset the board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Show the overlay message
function showMessage() {
    messageOverlay.style.display = "flex";
}

// Restart the game and hide the message overlay
function restartGame() {
    gameBoard.innerHTML = '';
    messageOverlay.style.display = "none";
    matchedPairs = 0;
    cardValues = [];
    cardElements = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    generateCardValues();
    createCards();
}

// Initialize the game
function initializeGame() {
    generateCardValues();
    createCards();
}

// Event listeners
playAgainBtn.addEventListener("click", restartGame);
restartButton.addEventListener("click", restartGame);

// Start the game
initializeGame();
