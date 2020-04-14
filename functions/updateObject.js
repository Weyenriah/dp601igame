// Update
function updateObject(object) {
  // Gravity for movement along y axis
  object.speedY += gravity * deltaTime / 100;

  moveObject(object, object.speedX, object.speedY);
}