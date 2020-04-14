/*
 * MAIN FILE
 */

let canvas = {
  // Height + Width is as big as user web browser window
  height: document.body.clientHeight,
  width: document.body.clientWidth
};

// Platforms
let objects = [
  { x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall START
  ...normalObjects,
  ...movingObjects,
  ...breakingObjects,
]

let gravity = 9.82;

let jumpForce = -30;

// SETUP --- Canvas
function setup() {
  createCanvas(canvas.width, canvas.height);
}

// For higher water level animation
let waterLevel = 100.0;

// DRAW --- Draw the game on canvas
function draw() {
  background(120, 186, 220);

  // Move "viewport" with the player movement
  translate(-player.x+canvas.width/3, 0);

  // Create platforms
  for (i = 0; i < objects.length; i++) {
    stroke(objects[i].stroke);
    fill(objects[i].color);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  }

  // Draw player
  player.draw();

  // Move "player"
  if (keyIsDown(LEFT_ARROW)) { // Left
    moveObject(player, -player.movementSpeed * deltaTime / 100, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) { // Right
    moveObject(player, player.movementSpeed * deltaTime / 100, 0);
  }
  if (keyIsDown(UP_ARROW)) { // Up
    if (player.isOnObjects(objects.filter(aliveObject))) {
      player.speedY += jumpForce;
    }
  }

  updateObject(player);

  // Create moving platforms
  for (i = 0; i < movingObjects.length; i++) {
    moveObject(movingObjects[i], movingObjects[i].speedX * deltaTime / 100, 0);

    if(movingObjects[i].x < movingObjects[i].leftMostX) {
      movingObjects[i].speedX = movingObjects[i].movementSpeed;
    }

    if(movingObjects[i].x > movingObjects[i].rightMostX) {
      movingObjects[i].speedX = -movingObjects[i].movementSpeed;
    }
  }

  // Breaking platforms
  for (let i = 0; i < breakingObjects.length; i++) {
    if(player.isOnObject(breakingObjects[i])) {
      breakingObjects[i].touches = true;
    }
    if(breakingObjects[i].touches) {
      breakingObjects[i].health -= deltaTime / 100;
    }
    if(breakingObjects[i].health <= 0) {
      breakingObjects[i].color = 100;
    }
  }

  /*
   * Perlin Noise Wave (Water)
   */
  stroke(59, 144, 143);
  fill(59, 144, 143);
  // Draw a polygon out of the wave points
  beginShape();

  let xoff = 300; // 2D Noise

  // Iterate over horizontal pixels
  for (let x = player.x - canvas.width; x <= player.x + canvas.width; x += 10) {
    // Controls water level
    if(keyIsDown(UP_ARROW)) {
      waterLevel += 0.0003;
    }

    // 2D Noise
    let y = map(noise(xoff, yoff), 0, 2, canvas.height-waterLevel /* Height of waterflow */, canvas.height);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // Increment y dimension for noise
  yoff += 0.01;
  vertex(player.x+canvas.width, height);
  vertex(player.x-canvas.width, height);

  endShape(CLOSE);

  if(player.y >= canvas.height) {
    document.getElementById('game-over').classList.add('display');
  }
}

// Has to do with Perlin Noise Wave (Water)
let yoff = 0.0;

// Get coordinates when clicking on screen --- Development only
function mousePressed() {
  console.log('x: ' + mouseX + ', y: ' + mouseY);
}