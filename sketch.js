let playerY, aiY, ballX, ballY, ballXSpeed, ballYSpeed, playerScore, aiScore;
let difficultyLevel = "medium"; // Default difficulty level
let gameStarted = false; // To track if the game has started

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerY = height / 2;
  aiY = height / 2;
  ballX = width / 2;
  ballY = height / 2;
  playerScore = 0;
  aiScore = 0;
  noLoop(); // Game doesn't start immediately
  displayDifficultyOptions(); // Display difficulty options
}

function draw() {
  if (gameStarted) {
    background(0);

    // Rest of the game code (paddles, ball, scoring, etc.) goes here

    // Move AI paddle based on difficulty
    if (frameCount % aiReactionRate === 0) {
      aiY = ballY;
    }

    // Check if there is a winner
    if (playerScore === 7) {
      displayResult("You win!", color(0, 255, 0));
      noLoop();
    } else if (aiScore === 7) {
      displayResult("You lose!", color(255, 0, 0));
      noLoop();
    }
  }
}

function resetGame() {
  playerScore = 0;
  aiScore = 0;
  resetBall();
  gameStarted = false;
  noLoop(); // Stop the game
  displayDifficultyOptions(); // Display difficulty options
}

function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  ballXSpeed = 5;
  ballYSpeed = 5;
}

function mouseMoved() {
  playerY = mouseY;
}

function keyPressed() {
  if (!gameStarted) {
    // Change difficulty level with keys (E for easy, M for medium, H for hard)
    if (key === 'E' || key === 'e') {
      difficultyLevel = "easy";
      setDifficulty(difficultyLevel);
      startGame(); // Start the game
    } else if (key === 'M' || key === 'm') {
      difficultyLevel = "medium";
      setDifficulty(difficultyLevel);
      startGame(); // Start the game
    } else if (key === 'H' || key === 'h') {
      difficultyLevel = "hard";
      setDifficulty(difficultyLevel);
      startGame(); // Start the game
    }
  }
}

function setDifficulty(level) {
  switch (level) {
    case "easy":
      aiReactionRate = 10; // Slower reaction time
      ballXSpeed = 4; // Slower ball speed
      ballYSpeed = 4;
      break;
    case "medium":
      aiReactionRate = 6; // Medium reaction time
      ballXSpeed = 5; // Medium ball speed
      ballYSpeed = 5;
      break;
    case "hard":
      aiReactionRate = 3; // Faster reaction time
      ballXSpeed = 6; // Faster ball speed
      ballYSpeed = 6;
      break;
  }
}

function displayDifficultyOptions() {
  background(0);
  textAlign(CENTER);
  textSize(24);
  fill(255);
  text("Choose Difficulty Level:", width / 2, height / 2 - 50);
  text("Press 'E' for Easy, 'M' for Medium, or 'H' for Hard", width / 2, height / 2 + 50);
  textSize(16);
  text("Current Difficulty: " + difficultyLevel, width / 2, height / 2 + 100);
}

function startGame() {
  gameStarted = true;
  loop(); // Start the game loop
}

function displayResult(resultText, textColor) {
  background(0);
  textSize(64);
  fill(textColor);
  textAlign(CENTER);
  text(resultText, width / 2, height / 2);
  textSize(24);
  fill(255);
  text("Press any key to restart", width / 2, height / 2 + 50);
}
