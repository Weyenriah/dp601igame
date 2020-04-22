// Collision detection
function moveObject(object, dx, dy) {
  // Gives all information about movement along x axis
  let movementAreaX = {
    x: object.x + Math.min(dx, 0),
    y: object.y,
    height: object.height,
    width: object.width + Math.abs(dx)
  };

  // Checks if object would collide with any object along x axis
  let wouldCollideWithX = levels[level].objects.filter((o) => o !== object && aliveObject(o)).filter((o) => areColliding(movementAreaX, o));

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
  let wouldCollideWithY = levels[level].objects.filter((o) => o !== object && aliveObject(o)).filter((o) => areColliding(movementAreaY, o));

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

// Checks if object is "alive"
function aliveObject(o) {
  return !o.hasOwnProperty('health') || o.health > 0;
}