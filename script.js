const gameBoard = document.getElementById('game-board');
const matchedCountEl = document.getElementById('matchedCount');
const unmatchedCountEl = document.getElementById('unmatchedCount');
const cards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchCount = 0;
let unMatchCount = 0;
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];

    }
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.innerHTML = `
                    <div class="front" style="background-image: url('./Images/${card}.jpg');"></div>
                    <div class="back"></div>
                `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchCount++;
    matchedCountEl.textContent = matchCount;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
    unMatchCount++;
    unmatchedCountEl.textContent = unMatchCount;
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    matchCount = 0;
    unMatchCount = 0;
    matchedCountEl.textContent = matchCount;
    unmatchedCountEl.textContent = unMatchCount;
    resetBoard();
    createBoard();
}

createBoard();