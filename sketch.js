let playerY, aiY, ballX, ballY, ballXSpeed, ballYSpeed, playerScore, aiScore;
let difficultyLevel = "medium"; // Default difficulty level
let difficultyOptions = ["easy", "medium", "hard"];
let difficultyIndex = 1; // Default difficulty index (medium)

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerY = height / 2;
  aiY = height / 2;
  ballX = width / 2;
  ballY = height / 2;
  playerScore = 0;
  aiScore = 0;
  setDifficulty(difficultyLevel); // Set initial difficulty
  displayDifficultyOptions();
}

function draw() {
  background(0);

  // Draw middle line
  stroke(255);
  line(width / 2, 0, width / 2, height);

  // Draw paddles
  rect(20, playerY - 40, 10, 80);
  rect(width - 30, aiY - 40, 10, 80);

  // Update ball position
  ballX += ballXSpeed;
  ballY += ballYSpeed;

  // Check ball collision with walls
  if (ballY < 0 || ballY > height) {
    ballYSpeed *= -1;
  }

  // Check ball collision with paddles
  if (ballX < 30 && ballY > playerY - 40 && ballY < playerY + 40) {
    ballXSpeed *= -1.1;
    ballYSpeed *= 1.1;
  }

  if (ballX > width - 30 && ballY > aiY - 40 && ballY < aiY + 40) {
    ballXSpeed *= -1.1;
    ballYSpeed *= 1.1;
  }

  // Check ball collision with score walls
  if (ballX < 0) {
    aiScore++;
    resetBall();
  }

  if (ballX > width) {
    playerScore++;
    resetBall();
  }

  // Draw ball
  ellipse(ballX, ballY, 20);

  // Draw score
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(playerScore + " - " + aiScore, width / 2, 40);

  // Move AI paddle based on difficulty
  if (ballY > aiY) {
    aiY += 2 * difficultyLevel;
  } else if (ballY < aiY) {
    aiY -= 2 * difficultyLevel;
  }

  // Check if there is a winner
  if (playerScore === 7) {
    textSize(64);
    fill(0, 255, 0);
    textAlign(CENTER);
    text("You win!", width / 2, height / 2);
    noLoop();
  } else if (aiScore === 7) {
    textSize(64);
    fill(255, 0, 0);
    textAlign(CENTER);
    text("You lose!", width / 2, height / 2);
    noLoop();
  }

  // Display current difficulty
  textSize(16);
  fill(255);
  text("Difficulty Level: " + difficultyLevel, 100, height - 20);

  //Show how to change difficulty
  text("To Change Difficulty Level press first letter of work on keyboard.", 100, height - 25)
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
  // Change difficulty level with keys (E for easy, M for medium, H for hard)
  if (key === 'E' || key === 'e') {
    changeDifficulty(-1); // Decrease difficulty
  } else if (key === 'M' || key === 'm') {
    difficultyIndex = 1; // Medium difficulty
    setDifficulty(difficultyOptions[difficultyIndex]);
  } else if (key === 'H' || key === 'h') {
    changeDifficulty(1); // Increase difficulty
  }
}

function setDifficulty(level) {
  switch (level) {
    case "easy":
      aiReactionRate = 5; // Slower reaction time
      ballXSpeed = 4; // Slower ball speed
      ballYSpeed = 4;
      break;
    case "medium":
      aiReactionRate = 10; // Medium reaction time
      ballXSpeed = 5; // Medium ball speed
      ballYSpeed = 5;
      break;
    case "hard":
      aiReactionRate = 15; // Faster reaction time
      ballXSpeed = 6; // Faster ball speed
      ballYSpeed = 6;
      break;
  }
}

function displayDifficultyOptions() {
  textSize(16);
  fill(255);
  textAlign(CENTER);
  text("Select Difficulty:", 100, height - 50);
  text("E - Easy", 100, height - 30);
  text("M - Medium", 100, height - 10);
  text("H - Hard", 100, height + 10);
}

function changeDifficulty(delta) {
  // Change difficulty by delta (1 for increase, -1 for decrease)
  difficultyIndex += delta;
  if (difficultyIndex < 0) {
    difficultyIndex = 0; // Ensure it doesn't go below easy
  } else if (difficultyIndex >= difficultyOptions.length) {
    difficultyIndex = difficultyOptions.length - 1; // Ensure it doesn't go above hard
  }
  difficultyLevel = difficultyOptions[difficultyIndex];
  setDifficulty(difficultyLevel);
}
