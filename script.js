// Grab the elements from our HTML
const buttons = document.querySelectorAll('.choice-btn');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result-text');

// The possible choices for the computer
const choices = ['Rock', 'Paper', 'Scissors'];

// Add a click listener to all 3 buttons
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // 1. Get the user's choice based on the button clicked
        const userChoiceId = event.target.id;
        // Capitalize the first letter (e.g., 'rock' becomes 'Rock')
        const userChoice = userChoiceId.charAt(0).toUpperCase() + userChoiceId.slice(1);
        
        // 2. Generate a random choice for the computer
        const randomNum = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[randomNum];
        
        // 3. Update the HTML to show what both players chose
        userChoiceDisplay.textContent = userChoice;
        computerChoiceDisplay.textContent = computerChoice;
        
        // 4. Figure out who won and update the HTML
        const result = determineWinner(userChoice, computerChoice);
        resultDisplay.textContent = result;
    });
});

// Function to decide the winner
function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a Draw! 🤝";
    }
    
    // Check all the ways the user can win
    if (
        (user === 'Rock' && computer === 'Scissors') ||
        (user === 'Paper' && computer === 'Rock') ||
        (user === 'Scissors' && computer === 'Paper')
    ) {
        return "You Win! 🎉";
    } 
    
    // If it's not a draw and the user didn't win, the computer wins
    return "Computer Wins! 🤖";
}
