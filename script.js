let incorrectGuess = 0;
const maxIncorrectGuess = 3;
let remainingLives = maxIncorrectGuess; 
let remainingHints = 3;
let currentQuestion = 0;
let points = 0;
let currentDifficulty = "easy";
let currentAnswer;
let guessButtons = [];


const easyQuestions = [
    { question: 'Who created JavaScript?', answer: 'jian michael wu' },
    { question: 'Who did 9/11?', answer: 'osama' },
    { question: 'Who did it?', answer: 'bush did it' },
    { question: 'Best subject on the planet?', answer: 'compais' },
    { question: 'ID mo iho?', answer: 'guard' },
    { question: 'Open notes?', answer: 'we di nga?' },
    { question: 'U can start walking na (did I get the blue comment?)', answer: 'umay' },
    { question: 'Cute prof of webprog?', answer: 'john gabriel sambajon' },
    { question: 'Cause of late sa nu?', answer: 'elevator' },
    { question: 'Saan tayo kakain after class?', answer: 'chaoking' },
];

const mediumQuestions = [
    { question: 'Refers to the object that is currently running the function.', answer: 'this' },
    { question: 'Refers to a technique where HTML elements are created for every letter, initially set to be hidden, and then updated to reflect correct guesses.', answer: 'document.createElement' },
    { question: 'Online platform that provides tutorials, references, and examples for various web development technologies', answer: 'w3schools' },
    { question: 'Refers to creating a personal copy of someone else project.', answer: 'fork' },
    { question: 'Proposed change to a repository on GitHub.', answer: 'pull request' },
    { question: 'Is an automation tool that allows developers to define workflows for their projects.', answer: 'github actions' },
    { question: 'Feature allows users to experiment with code directly on the W3Schools website.', answer: 'try it yourself' },
    { question: 'This technique involves attaching a single event listener to a shared parent element, enabling it to handle events for multiple child elements.', answer: 'event delegation' },
    { question: 'Is block-scoped but cannot be reassigned.', answer: 'const' },
    { question: 'Is block-scoped and can be reassigned.', answer: 'let' },
];

const hardQuestions = [
    { question: 'The user will have to click OK to proceed?', answer: 'alert box' },
    { question: 'Defined using var, let, or const', answer: 'global scope' },
    { question: 'Stand for JSON', answer: 'java script object notation' },
    { question: 'Returns true if an element has any child nodes, otherwise false.', answer: 'elements.hasChildNodes' },
    { question: 'Stand for ECMAScript?', answer: 'european computer manufacturer’s association' },
    { question: 'Is used to define a special state of an element.', answer: 'pseudo-class' },
    { question: 'Display a single-line text input field', answer: '<input type ="text">' },
    { question: 'Display a checkbox', answer: '<input type="checkbox">' },
    { question: 'Is used to perform different actions based on different conditions.', answer: 'switch statement' },
    { question: 'Returns the parent of node of an element.', answer: 'o element.parentNode' },
];

// Array to keep track of used letters 
var usedLetters = [];

const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '<', '>', '=', '"', "’", '-', '?'
];


document.addEventListener('DOMContentLoaded', () => {
    const alphabetButtonsContainer = document.getElementById('alphabet-buttons');
    const difficultyElement = document.getElementById('difficulty');

    currentAnswer = easyQuestions[0].answer.toUpperCase(); //answer

    const livesElement = document.getElementById('lives');

    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = letter;
        
        button.addEventListener('click', () => {
            //Button click logic

            if (usedLetters.includes(letter)) {
                console.log(`Letter ${letter} has been used.`);
                return;
            }

            usedLetters.push(letter); // Add the clicked letter to the usedLetters array
            

            if (includesLetter(currentAnswer, letter)) {
                console.log(`Letter ${letter} is in the answer.`);

                // Iterate through all occurrences of the letter in the answer
                for (let i = 0; i < currentAnswer.length; i++) {
                    if (currentAnswer[i] === letter) {
                        guessButtons[i].textContent = letter;
                    }
                }

                button.classList.add('correct');

                if (isGuessed(currentAnswer)) {
                    console.log("The word has been fully guessed!");
                    nextQuestion();
                }
                
                } else {
                    button.disabled = true;
                    console.log(`Letter ${letter} is not in the answer.`);
                    remainingLives--;
                    updateLivesUI();
                }

            console.log(`Button ${letter} clicked! Incorrect guesses: ${incorrectGuess}`);
        });

        alphabetButtonsContainer.appendChild(button);
    });

    //questions
    let questionElement = document.getElementById('question');
    questionElement.textContent = easyQuestions[0].question;

    let guessesContainer = document.getElementById('guesses');




    for (let i = 0; i < currentAnswer.length; i++) {
        let guess = document.createElement('button');
        guess.classList.add('guess');
        guess.textContent = ' ';
        guessesContainer.appendChild(guess);
        guessButtons.push(guess);
    }

    function includesLetter(answer, letter) {
        // Helper function to check if the answer includes the letter, ignoring spaces
        const formattedAnswer = answer.replace(/ /g, ''); // Remove spaces from the answer
        return formattedAnswer.includes(letter);
    }


    function isGuessed(answer) {
        // Checks if all non-space characters in the answer have been guessed
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] !== ' ' && guessButtons[i].textContent === ' ') {
                return false;
            }
        }
        return true;
    }


    // function isGuessed() {   //checks if the "button".guess may laman na letter 
    //     for (let i = 0; i < currentAnswer.length; i++) {
    //         if (guessButtons[i].textContent === ' ') {
    //             return false; 
    //         }
    //     }
    //     return true; 
    // }

    function createButtons(word) {
        guessesContainer.innerHTML = '';
        for (let i = 0; i < word.length; i++) {
        let guess = document.createElement('button');
        guess.classList.add('guess');
        guess.textContent = ' ';
        guessesContainer.appendChild(guess);
        guessButtons.push(guess);
        }
    }

    function checkDifficultyCompletion() {
        let questionsSet;
        

        if (currentDifficulty === "easy") {
            questionsSet = easyQuestions;
        } else if (currentDifficulty === "medium") {
            questionsSet = mediumQuestions;
            
        } else if (currentDifficulty === "hard") {
            questionsSet = hardQuestions;
            
        }

        if (currentQuestion >= questionsSet.length) {
            if (currentDifficulty === "easy") {
                currentDifficulty = "medium";
                difficultyElement.textContent = "Medium Difficulty";
            } else if (currentDifficulty === "medium") {
                difficultyElement.textContent = "Hard Difficulty";
                currentDifficulty = "hard";
            } else if (currentDifficulty === "hard") {
                window.alert("You have won! congratulations. Press OK to play again");
                location.reload();
            }

            currentQuestion = 0; // Reset currentQuestion for the new difficulty
            // Display a message or perform any other action to indicate the change of difficulty
            console.log(`Difficulty changed to ${currentDifficulty}.`);
        }
    }

    function nextQuestion() {
        currentQuestion++; // Move to the next question
        checkDifficultyCompletion();

        while (guessesContainer.firstChild) {
            guessesContainer.removeChild(guessesContainer.firstChild);
        }
        
        guessButtons = []; // Reset the guessButtons array
        
        let questionsSet;   //pang set ng difficulty
        if (currentDifficulty === "easy") {
            questionsSet = easyQuestions;
        } else if (currentDifficulty === "medium") {
            questionsSet = mediumQuestions;
        } else if (currentDifficulty === "hard") {
            questionsSet = hardQuestions;
        }

        if (currentQuestion >= questionsSet.length) {
            if (currentDifficulty === "easy") {
                currentDifficulty = "medium";
            } else if (currentDifficulty === "medium") {
                currentDifficulty = "hard";
            } else if (currentDifficulty === "hard") {
                console.log("All questions have been answered.");
                return;
            }

            currentQuestion = 0; // Reset currentQuestion for the new difficulty
            // Display a message or perform any other action to indicate the change of difficulty
            console.log(`Difficulty changed to ${currentDifficulty}.`);
        }
    
    
        // Reset variables
        incorrectGuess = 0;
        usedLetters = [];
    
        points += 10; // Add points
        document.getElementById('score').innerHTML = `<p><strong>Points:</strong> ${points}</p>`;

    
        guessButtons.forEach(guess => { // Reset the display
            guess.textContent = ' ';
            guess.disabled = false;
        });
    
        alphabetButtonsContainer.querySelectorAll('.button').forEach(button => {
            button.classList.remove('correct'); 
            button.disabled = false; 
        });
    
        questionElement.textContent = questionsSet[currentQuestion].question;
        currentAnswer = questionsSet[currentQuestion].answer.toUpperCase();

        createButtons(currentAnswer);
    }

    // function checkIncorrect(){
    //     if (incorrectGuess === maxIncorrectGuess){
    //         alphabetButtonsContainer.querySelectorAll('.button').forEach(button => {
    //             button.disabled = true;
    //         });
    //         window.alert("You have ran out of lives, press OK to retry");
    //         location.reload();
    //     }
    // } //pang check if 3 incorrect na

    function updateLivesUI() {
        console.log("Updating lives UI");
    
        const livesContainer = document.getElementById('lives-container');
        if (livesContainer) {
            livesContainer.innerHTML = `<p> <strong>Lives: </strong> ${remainingLives} </p>`;
    
            if (remainingLives === 0) {
                // Show the modal
                const overlay = document.getElementById('overlay');
                const modal = document.getElementById('gameOverModal');
                overlay.style.display = 'block';
                modal.style.display = 'block';
            }
        } else {
            console.error("Lives container not found");
        }
    }
    
    
   


    

});

function restartGame() {
    console.log('Restarting the game...');
    window.location.reload();
    
}




let consonants = "BCDFGHJKLMNPQRSTVWXYZ";
let vowels = "AEIOU";


function showHintPopup() {
    const hintPopup = document.getElementById('hintPopup');
    const overlay = document.getElementById('overlay');

    if (remainingHints > 0) {
        hintPopup.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        showInsufficientPointsPopup("You ran out of hints!"); // Show a different message or handle as needed
    }
}


function closeHintPopup() {
    const hintPopup = document.getElementById('hintPopup');
    const overlay = document.getElementById('overlay');
    hintPopup.style.display = 'none';
    overlay.style.display = 'none';
}


function useHint(hintType) {
    const hintPopup = document.getElementById('hintPopup');
    hintPopup.style.display = 'none';

    let revealedLetter;

    if (hintType === 'consonant') {
        revealedLetter = getUnrevealedLetter(consonants);
    } else if (hintType === 'vowel') {
        revealedLetter = getUnrevealedLetter(vowels);
    }

    if (revealedLetter !== null) {
        if (points >= 25) {
            revealLetter(revealedLetter);
            updateHint();
            closeHintPopup();
            deductPoints(25);
        } else {
    
            showInsufficientPointsPopup(); 
        }
    } else {
        showInsufficientPointsPopup("No more letters to reveal for this hint type.");
    }
}

function deductPoints(pointsToDeduct) {
    points -= pointsToDeduct;
    if (points < 0) {
        points = 0;
    }

    document.getElementById('score').innerHTML = `<p><strong>Points:</strong> ${points}</p>`;

}


function updateHint() {
    remainingHints--;

    // Log the remainingHints to check if it's decreasing correctly
    console.log("Remaining Hints:", remainingHints);

    // Update the hint count in the HTML
    const hintContainer = document.getElementById('hint-container');
    if (hintContainer) {
        hintContainer.innerHTML = `<strong>Hint:</strong> ${remainingHints}`;
    } else {
        console.error("Hint container not found");
    }
}



function showInsufficientPointsPopup(message = "Insufficient Points! You need at least 25 points to use a hint.") {
    const insufficientPointsPopup = document.getElementById('insufficientPointsPopup');
    const overlay = document.getElementById('overlay');

    insufficientPointsPopup.querySelector('.popup-content p').textContent = message;

    insufficientPointsPopup.style.display = 'block';
    overlay.style.display = 'block';
}


function closeInsufficientPointsPopup() {
    const insufficientPointsPopup = document.getElementById('insufficientPointsPopup');
    const overlay = document.getElementById('overlay');
    insufficientPointsPopup.style.display = 'none';
    overlay.style.display = 'none';
}




function getUnrevealedLetter(letterSet) {
    for (let i = 0; i < letterSet.length; i++) {
        const letter = letterSet[i].toUpperCase(); 

        if (!usedLetters.includes(letter) && currentAnswer.includes(letter)) {
            return letter;
        }
    }

    return null; 
}


function revealLetter(letter) {
    if (guessButtons.length === 0) {
        console.error('guessButtons array is empty.');
        return;
    }

    usedLetters.push(letter);
    closeHintPopup();

    // Find all instances of the letter in the answer
    for (let i = 0; i < currentAnswer.length; i++) {
        if (currentAnswer[i] === letter) {
            guessButtons[i].textContent = letter;
        }
    }

    console.log(`Letter ${letter} revealed.`);
}