/*
 * MAIN FILE
 */

let canvas = {
  height: 700,
  width: 1200
};

// Level specific information
let levels = [
  { // Start level
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [
      { type: 'normal', x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall START
      { type: 'normal', x: 0, y: 500, width: 1500, height: 300, color: 50, stroke: 50 }, // Start platform
    ],
    jumpForce: -30,
    nextLevel() {
      if(player.x > 1450) {
        return 1;
      }
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
    },
    characters: [
      // { x: -150, y: 300, width: 250, height: 400, color: 75, stroke: 75 }, // Activist
      // { x: 700, y: 300, width: 250, height: 400, color: 25, stroke: 25 }, // Denier
    ],
  },
  {
    waterLevel: 100.0,
    waterIsRising: 0.0003, // Water rising (because of player choice)
    objects: [],
    jumpForce: -30,
    nextLevel() {
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'normal', x: -1900, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall START
        { type: 'normal', x: -1200, y: 500, width: 1500, height: 300, color: 50, stroke: 50 }, // Start platform
        { type: 'normal', x: 400, y: 400, width: 250, height: 30, color: 50, stroke: 50 },
        // { type: 'moving', x: 2150, y: 200, width: 250, height: 30, color: 100, stroke: 100, speedX: 10, leftMostX: 2150, rightMostX: (2150 + 2 * 250), movementSpeed: 10 },
        // { type: 'breaking', x: 800, y: 400, width: 250, height: 30, color: 255, stroke: 255, touches: false, health: 5.0 },
      ]
      this.waterLevel = 100.0;
    },
    characters: [
      // { x: -150, y: 300, width: 250, height: 400, color: 75, stroke: 75 }, // Activist
      // { x: 700, y: 300, width: 250, height: 400, color: 25, stroke: 25 }, // Denier
    ],
  },
  {
    waterLevel: 100.0,
    waterIsRising: 0.0,
    objects: [],
    jumpForce: -20, // Jumpforce lower (because of player choice)
    nextLevel() {
      return null;
    },
    reset() {
      player.x = 200;
      player.y = 0;
      player.speedX = 0;
      player.speedY = 0;
      this.objects = [
        { type: 'normal', x: -1900, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall START
        { type: 'normal', x: -1200, y: 500, width: 1500, height: 300, color: 50, stroke: 50 }, // Start platform
        { type: 'normal', x: 400, y: 400, width: 250, height: 30, color: 50, stroke: 50 },
      ]
      this.waterLevel = 100.0;
    },
    characters: [
      // { x: -150, y: 300, width: 250, height: 400, color: 75, stroke: 75 }, // Activist
      // { x: 700, y: 300, width: 250, height: 400, color: 25, stroke: 25 }, // Denier
    ],
  },
]

let level = 0;

let gravity = 9.82;

// SETUP --- Canvas
function setup() {
  createCanvas(canvas.width, canvas.height);

  levels[level].reset();
}

// DRAW --- Draw the game on canvas
function draw() {
  background(120, 186, 220);

  // Move "viewport" with the player movement
  translate(-player.x+canvas.width/3, 0);

  // Create platforms
  for (i = 0; i < levels[level].objects.length; i++) {
    stroke(levels[level].objects[i].stroke);
    fill(levels[level].objects[i].color);
    rect(levels[level].objects[i].x, levels[level].objects[i].y, levels[level].objects[i].width, levels[level].objects[i].height);
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
    if (player.isOnObjects(levels[level].objects.filter(aliveObject))) {
      player.speedY += levels[level].jumpForce;
    }
  }

  updateObject(player);

  // Create moving platforms
  let movingObjects = levels[level].objects.filter((o) => o.type === 'moving');

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
  let breakingObjects = levels[level].objects.filter((o) => o.type === 'breaking');

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
    levels[level].waterLevel += levels[level].waterIsRising;

    // 2D Noise
    let y = map(noise(xoff, yoff), 0, 2, canvas.height-levels[level].waterLevel /* Height of waterflow */, canvas.height);

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

  // Characters
  for (i = 0; i < levels[level].characters.length; i++) {
    stroke(levels[level].characters[i].stroke);
    fill(levels[level].characters[i].color);
    rect(levels[level].characters[i].x, levels[level].characters[i].y, levels[level].characters[i].width, levels[level].characters[i].height);
  }

  // Game over-screen --- At waterlevel
  if(player.y >= canvas.height - levels[level].waterLevel) {
    document.getElementById('game-over').classList.add('display');
  }

  let nextLevel = levels[level].nextLevel();

  if(nextLevel !== null) {
    level = nextLevel;
    levels[level].reset();
  }
}

// Has to do with Perlin Noise Wave (Water)
let yoff = 0.0;

// Get coordinates when clicking on screen --- Development only
function mousePressed() {
  console.log('x: ' + mouseX + ', y: ' + mouseY);
  console.log(JSON.stringify(levels[level]));
}

// Onclick for Game over-screen
function gameOver() {
  levels[level].reset();
  document.getElementById('game-over').classList.remove('display');
}