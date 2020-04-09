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

// Platforms
let objects = [
  { x: 200, y: 700, width: 250, height: 30, color: 0 },
  { x: 550, y: 800, width: 250, height: 30, color: 0 },
  { x: 900, y: 800, width: 250, height: 30, color: 0 },
  { x: 1200, y: 700, width: 250, height: 30, color: 0 },
  { x: 1500, y: 500, width: 250, height: 30, color: 0 },
  { x: 1800, y: 300, width: 250, height: 30, color: 0 },
]

let gravity = 9.82;

let jumpForce = -30;

function setup() {
  // Height + Width is as big as user web browser window
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  createCanvas(canvas.width, canvas.height);
}

function draw() {
  background(70, 123, 117);

  translate(-player.x+canvas.width/3, 0);

  // Create platforms
  for (i = 0; i < objects.length; i++) {
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
}

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
  let wouldCollideWithX = objects.filter((o) => areColliding(movementAreaX, o));

  if(wouldCollideWithX.length > 0) {
    if(dx > 0) { // Going right
      // Checks which left wall is the closest
      let closestWall = Math.min(...wouldCollideWithX.map((o) => o.x));

      // Moves object to closest wall that it collides with
      object.x = closestWall - object.width;
    } else { // Going left
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
  let wouldCollideWithY = objects.filter((o) => areColliding(movementAreaY, o));

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