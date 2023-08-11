let randomNumber, score, highScore, isGameOver;
const messageElement = document.querySelector('.message');
const numberElement = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const guessElement = document.querySelector('.guess');
const highScoreElement = document.querySelector('.highscore');

initializeGame();

document.querySelector('.check').addEventListener('click', function () {
  if (isGameOver) {
    initializeGame();
    return;
  }

  const guess = Number(guessElement.value);

  if (guess < 1 || guess > 20) {
    displayMessage('⚠️ Enter a number between 1 and 20!');
  } else if (!guess) {
    displayMessage('⛔ Enter a valid number!');
  } else if (guess === randomNumber) {
    handleCorrectGuess();
  } else if (guess !== randomNumber) {
    displayMessage(guess > randomNumber ? '📈 Too high!' : '📉 Too low!');
    decreaseScore();
  }
});

document.querySelector('.again').addEventListener('click', initializeGame);

function initializeGame() {
  score = 20;
  randomNumber = generateRandomNumber();
  isGameOver = false;

  numberElement.textContent = '?';
  guessElement.value = '';
  displayMessage('Start guessing...');
  scoreElement.textContent = score;

  document.querySelector('body').style.backgroundColor = '#222';
  numberElement.style.width = '15rem';
  document.querySelector('.check').textContent = 'Check';
  guessElement.disabled = false;

  if (highScore === undefined) {
    highScore = 0;
  }

  highScoreElement.textContent = highScore;
}

function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function displayMessage(message) {
  messageElement.textContent = message;
}

function handleCorrectGuess() {
  displayMessage('🎉 Correct number!');
  numberElement.textContent = randomNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  numberElement.style.width = '30rem';
  isGameOver = true;

  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
  }

  document.querySelector('.check').textContent = 'Again';
  guessElement.disabled = true;
}

function decreaseScore() {
  if (score > 1) {
    score--;
    scoreElement.textContent = score;
  } else {
    displayMessage('💥 You lost the game!');
    scoreElement.textContent = 0;
    isGameOver = true;
    document.querySelector('.check').textContent = 'Again';
    guessElement.disabled = true;
  }
}
