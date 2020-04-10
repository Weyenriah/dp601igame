// Perlin Noise Wave (Water)


// Player
let player = {
  // Horizontal
  x: 200,
  // Vertical
  y: 0,
  speedX: 0,
  speedY: 0,
  height: 100,
  width: 50,
  movementSpeed: 30,
  color: {
    r: 0,
    g: 0,
    b: 0
  },
  draw() {
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.x, this.y, this.width, this.height);
  }
};

let canvas = {
  height: 400,
  width: 800
};

let movingObjects = [
  { x: 2100, y: 200, width: 250, height: 30, color: 50, stroke: 50, speedX: 10, leftMostX: 2000, rightMostX: (2000 + 2 * 250), movementSpeed: 10 },
]

// Platforms
let objects = [
  { x: -700, y: 0, width: 700, height: document.body.clientHeight, color: 0, stroke: 0 }, // Wall START
  { x: 0, y: 700, width: 250, height: 300, color: 50, stroke: 50 }, // Start platform
  { x: 400, y: 700, width: 250, height: 30, color: 50, stroke: 50 },
  { x: 550, y: 800, width: 250, height: 30, color: 50, stroke: 50 },
  { x: 950, y: 800, width: 250, height: 30, color: 50, stroke: 50 },
  { x: 1200, y: 700, width: 250, height: 30, color: 50, stroke: 50 },
  { x: 1500, y: 500, width: 250, height: 30, color: 50, stroke: 50 },
  { x: 1800, y: 300, width: 250, height: 30, color: 50, stroke: 50 },
  { x: 2900, y: 300, width: 250, height: 30, color: 50, stroke: 50 },
  ...movingObjects,
]

let gravity = 9.82;

let jumpForce = -30;

function setup() {
  // Height + Width is as big as user web browser window
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  createCanvas(canvas.width, canvas.height);
}

// For higher water level animation
let waterLevel = 100.0;

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
    if (objects.some((o) => player.y + player.height === o.y && player.x + player.width > o.x && player.x < o.x + o.width)) {
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

  // Perlin Noise Wave (Water)
  stroke(59, 144, 143);
  fill(59, 144, 143);
  // We are going to draw a polygon out of the wave points
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
  // increment y dimension for noise
  yoff += 0.01;
  vertex(player.x+canvas.width, height);
  vertex(player.x-canvas.width, height);
  endShape(CLOSE);
}

// Has to do with Perlin Noise Wave (Water)
let yoff = 0.0;

function mousePressed() {
  console.log('x: ' + mouseX + ', y: ' + mouseY);
}

// Collision Detection (Rectangle)
function areColliding(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function moveObject(object, dx, dy) {
  // Gives all information about movement along x axis
  let movementAreaX = {
    x: object.x + Math.min(dx, 0),
    y: object.y,
    height: object.height,
    width: object.width + Math.abs(dx)
  };

  // Checks if object would collide with any object along x axis
  let wouldCollideWithX = objects.filter((o) => o !== object).filter((o) => areColliding(movementAreaX, o));

  if(wouldCollideWithX.length > 0) {
    if(dx > 0) { // Going right
      // Checks which left wall is the closest
      let closestWall = Math.min(...wouldCollideWithX.map((o) => o.x));

      // Moves object to closest wall that it collides with
      object.x = closestWall - object.width;
    } else if (dx < 0) { // Going left
      // Checks which right wall is the closest
      let closestWall = Math.max(...wouldCollideWithX.map((o) => o.x + o.width));

      // Moves object to closest wall that it collides with
      object.x = closestWall;
    }

    // Lose all speed when colliding
    object.speedX = 0;
  } else { // No collision
    // Allow movement
    object.x += dx;
  }

  // Gives all information about movement along y axis
  let movementAreaY = {
    x: object.x,
    y: object.y + Math.min(dy, 0),
    height: object.height + Math.abs(dy),
    width: object.width
  };

  // Checks if object would collide with any object along y axis
  let wouldCollideWithY = objects.filter((o) => o !== object).filter((o) => areColliding(movementAreaY, o));

  if(wouldCollideWithY.length > 0) {
    if(dy > 0) { // Going down
      // Checks which floor (platform top) is the closest
      let closestFloor = Math.min(...wouldCollideWithY.map((o) => o.y));

      // Moves object to closest floor that it collides with
      object.y = closestFloor - object.height;
    } else { // Going up
      // Checks which roof (underneath platform) is the closest
      let closestRoof = Math.max(wouldCollideWithY.map((o) => o.y + o.height));

      // Moves object to closest roof that it collides with
      object.y = closestRoof;
    }

    // Lose all speed when colliding
    object.speedY = 0;
  } else { // No collision
    object.y += dy;
  }
}

function updateObject(object) {
  // Gravity for movement along y axis
  object.speedY += gravity * deltaTime / 100;

  moveObject(object, object.speedX, object.speedY);
}