// Screens
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsArea = document.getElementById('results-area');
const choicesDiv = document.querySelector('.choices');

// Buttons
const btn1P = document.getElementById('btn-1p');
const btn2P = document.getElementById('btn-2p');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');
const homeBtn = document.getElementById('home-btn');

// Text Elements
const turnIndicator = document.getElementById('turn-indicator');
const matchupText = document.getElementById('matchup-text');
const resultText = document.getElementById('result-text');

// Game State
let gameMode = ''; // '1p' or '2p'
let player1Choice = '';
const choices = ['Rock', 'Paper', 'Scissors'];

// --- Event Listeners for Mode Selection ---
btn1P.addEventListener('click', () => startGame('1p'));
btn2P.addEventListener('click', () => startGame('2p'));

function startGame(mode) {
    gameMode = mode;
    player1Choice = '';
    
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    resetBoard();
}

// --- Event Listeners for Gameplay ---
choiceBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedChoice = e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1);

        if (gameMode === '1p') {
            playVsRobot(selectedChoice);
        } else if (gameMode === '2p') {
            playVsPlayer(selectedChoice);
        }
    });
});

function playVsRobot(p1Choice) {
    const randomNum = Math.floor(Math.random() * choices.length);
    const robotChoice = choices[randomNum];
    
    showResults(p1Choice, robotChoice, "You", "Robot");
}

function playVsPlayer(choice) {
    if (player1Choice === '') {
        // Player 1 just chose. Save it, clear screen, and ask Player 2.
        player1Choice = choice;
        turnIndicator.textContent = "Player 2's Turn";
    } else {
        // Player 2 just chose. Evaluate the game.
        const player2Choice = choice;
        showResults(player1Choice, player2Choice, "Player 1", "Player 2");
    }
}

// --- Game Logic and UI Updates ---
function showResults(choice1, choice2, name1, name2) {
    // Hide the buttons so no one can click again
    choicesDiv.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    turnIndicator.textContent = "Game Over!";
    
    matchupText.textContent = `${name1} chose ${choice1} | ${name2} chose ${choice2}`;
    
    if (choice1 === choice2) {
        resultText.textContent = "It's a Draw! 🤝";
    } else if (
        (choice1 === 'Rock' && choice2 === 'Scissors') ||
        (choice1 === 'Paper' && choice2 === 'Rock') ||
        (choice1 === 'Scissors' && choice2 === 'Paper')
    ) {
        resultText.textContent = `${name1} Wins! 🎉`;
    } else {
        resultText.textContent = `${name2} Wins! 🏆`;
    }
}

// --- Resetting the Board ---
resetBtn.addEventListener('click', resetBoard);

homeBtn.addEventListener('click', () => {
    gameScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});

function resetBoard() {
    player1Choice = '';
    choicesDiv.classList.remove('hidden');
    resultsArea.classList.add('hidden');
    
    if (gameMode === '1p') {
        turnIndicator.textContent = "Your Turn vs Robot";
    } else {
        turnIndicator.textContent = "Player 1's Turn";
    }
}
