let playerY, aiY, ballX, ballY, ballXSpeed, ballYSpeed, playerScore, aiScore;
let difficultyLevel = "medium"; // Change this to "easy" or "hard" for different difficulties

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerY = height / 2;
  aiY = height / 2;
  ballX = width / 2;
  ballY = height / 2;
  playerScore = 0;
  aiScore = 0;
  setDifficulty(difficultyLevel);
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
  if (frameCount % aiReactionRate === 0) {
    aiY = ballY;
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
