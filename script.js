// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, collideCirclePoly,text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, startT, millis, coinX, coinY, s, b, rock1X, rock1Y, rock2X, rock2Y*/

let backgroundColor,
  frog1X,
  frog1Y,
  frog1V,
  frog2X,
  frog2Y,
  frog2V,
  lives1,
  lives2,
  gameIsOver,
  win1,
  win2,
  win,
  inv1,
  inv1T,
  inv2,
  inv2T,
  car1X,
  car1Y,
  car1V,
  car2X,
  car2Y,
  car2V
  startT
  coinX,
  coinY,
  s,
  b
  rock1X,
  rock1Y,
  rock2X,
  rock2Y;


function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frog1X = 3 * width / 4;
  frog1Y = height * .9;
  frog1V = 10;
  frog2X = width / 4;
  frog2Y = height * .9;
  frog2V = 10;
  lives1 = 5;
  lives2 = 5;
  gameIsOver = false;
  win = false;
  win1 = false;
  win2 = false;
  inv1 = false;
  inv1T = 0;
  inv2 = false;
  inv2T = 0;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  car2X = 0;
  car2Y = 200;
  car2V = 5;
  s = 80;
  b = 80;
  coinX = random(0, width);
  coinY = random(200, height * .8);
  startT = millis();
  rock1X = random(width-20);
  rock1Y = random(100, height-100);
  rock2X = random(width-20);
  rock2Y = random(100, height-100);
}

function draw() {
  if (!gameIsOver) {
    background(backgroundColor);
    
    // Gold goal line
    fill(60, s, b);
    rect(0, 0, width, 50);
    
    // Display Frog1
    if(inv1){
      fill(60, s, b);
      handleTime();
    }
    else
      fill(10, s, b);
    ellipse(frog1X, frog1Y, 20);
    
    // Display Frog2
    if(inv2){
      fill(290, s, b);
      handleTime();
    }
    else
      fill(200, s, b);
    ellipse(frog2X, frog2Y, 20);
    
    // Display powerup coin
    fill(40, 100, 100);
    ellipse(coinX, coinY, 10);
    
    // Display rock squares
    fill(39, s, b);
    rect(rock1X, rock1Y, 20, 20);
    rect(rock2X, rock2Y, 20, 20);
    
    
    performCars();
    checkWin();
    displayLives();
    checkCollisions();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    frog1Y -= frog1V;
  } else if (keyCode === DOWN_ARROW) {
    frog1Y += frog1V;
  } else if (keyCode === LEFT_ARROW) {
    frog1X -= frog1V;
  } else if (keyCode === RIGHT_ARROW) {
    frog1X += frog1V;
  }
  
  if (keyCode === 87) {
    frog2Y -= frog2V;
  } else if (keyCode === 83) {
    frog2Y += frog2V;
  } else if (keyCode === 65) {
    frog2X -= frog2V;
  } else if (keyCode === 68) {
    frog2X += frog2V;
  }
}

function performCars() {
  // Draw cars
  fill(120, s, b);
  rect(car1X, car1Y, 40, 30);
  rect(car2X, car2Y, 40, 30);
  
  // Move car1
  car1X += car1V;
  // Reset if off screen
  if (car1X >= width) {
    car1X = -30;
    car1Y = random(100, height * 0.8);
  }
  
  // Move car2
  if(millis() > startT + 750){
    car2X += car2V;
    // Reset if off screen
    if (car2X >= width) {
      car2X = -30;
      car2Y = random(100, height * 0.8);
    }
  }
}

function checkCollisions() {
  // Frog 1 Collisions
  // Frog 1 - Cars
  if(!inv1){
    if(collideRectCircle(car1X, car1Y, 40, 30, frog1X, frog1Y, 20) || collideRectCircle(car2X, car2Y, 40, 30, frog1X, frog1Y, 20)) {
      // console.log("collided with Car");
      frog1X = 3 * width / 4;
      frog1Y = height * 0.9;
      lives1 -= 1;
      frog1V = 10;
    }
  }
  // Frog 1 - PowerUp
  if(collideCircleCircle(frog1X, frog1Y, 20, coinX, coinY, 10)){
    powerUp(1);
  }
  
  // Frog 2 Collisions
  // Frog 2 - Cars
  if(!inv2){
    if(collideRectCircle(car1X, car1Y, 40, 30, frog2X, frog2Y, 20) || collideRectCircle(car2X, car2Y, 40, 30, frog2X, frog2Y, 20)) {
      // console.log("collided with Car");
      frog2X = width / 4;
      frog2Y = height * .9;
      lives2 -= 1;
      frog2V = 10;
    }
  }
  
  if (collideRectCircle(rock1X, rock1Y, 20, 20, frog1X, frog1Y, 20) || collideRectCircle(rock2X, rock2Y, 20, 20, frog1X, frog1Y, 20)){
    frog1V = 5;
  }
  if (collideRectCircle(rock1X, rock1Y, 20, 20, frog2X, frog2Y, 20) || collideRectCircle(rock2X, rock2Y, 20, 20, frog2X, frog2Y, 20)){
    frog2V = 5;
  }
  
    
    // Frog 2 - PowerUp
  if(collideCircleCircle(frog2X, frog2Y, 20, coinX, coinY, 10)){
    powerUp(2);
  }

  if(lives1 <= 0) {
    gameIsOver = true;
  }
  if(lives2 <= 0){
    gameIsOver = true;
  }
}

function powerUp(frogNum){
  coinX = random(0, width);
  coinY = random(200, height * .8);
  if(frogNum == 1){
    inv1 = true;
    inv1T = 0;
  }
  else{
    inv2 = true;
    inv2T = 0;
  }
}

function handleTime(){
  inv1T++;
  if(inv1T >= 250){
    inv1 = false;
  }
  inv2T++;
  if(inv2T >= 250){
    inv2 = false;
  }
}

function checkWin() {
  // Frog 1 Win
  if(collideRectCircle(0, 0, width, 40, frog1X, frog1Y, 20)){
    win1 = true;
    gameIsOver = true;
  }
  
  // Frog 1 Win
  if (collideRectCircle(0, 0, width, 40, frog2X, frog2Y, 20)) {
    win2 = true;
    gameIsOver = true;
  }
}

function displayLives() {
  textSize(12);
  fill(0);
  // Display lives1
  text(`Lives: ${lives1}`, 10, 20);
  text(`Lives: ${lives2}`, width-55, 20);
  
  // Display game over message
  if(gameIsOver) {
    textSize(60);
    text("GAME OVER", 70, height/2);
  }
  // Player 1 wins
  if(win1){
    textSize(50);
    text("Right Player Wins!", 50, height/2 + 60);
  }
  // Player 2 wins
  if(win2){
    textSize(50);
    text("Left Player Wins!", 70, height/2 + 60);
  }
  // Two different text things for each player winning
}
