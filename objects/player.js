// Player
let player = {
  // Horizontal
  x: 200,
  // Vertical
  y: 0,
  speedX: 0,
  speedY: 0,
  height: 181/2,
  width: 131/2,
  movementSpeed: 30,
  color: {
    r: 0,
    g: 0,
    b: 0
  },
  stroke: 0,
  draw() {
    if (player.isOnObjects(levels[level].objects.filter(aliveObject))) {
      if(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
        const fps = 16;
        const img = images.playerwalk[Math.floor((time * fps) % images.playerwalk.length)];
        if(keyIsDown(LEFT_ARROW)) {
          image(img, this.x, this.y, this.width, this.height);
        } else {
          // Flip using a matrix
          push();
          scale(-1.0, 1.0)
          image(img, -this.x-this.width, this.y, this.width, this.height);
          pop();
        }
      } else {
        image(images.player, this.x, this.y, this.width, this.height);
      }
    } else {
      if (keyIsDown(LEFT_ARROW)) {
        image(images.playerjump, this.x, this.y, this.width, this.height);
      } else {
        // Flip using a matrix
        push();
        scale(-1.0, 1.0)
        image(images.playerjump, -this.x-this.width, this.y, this.width, this.height);
        pop();
      }
    }
  },
  isOnObject (object) {
    return player.y + player.height === object.y && player.x + player.width > object.x && player.x < object.x + object.width
  },
  isOnObjects (objects) {
    return objects.some(this.isOnObject)
  }
};

// For rotating
function rotate_and_draw_image(img, img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(PI/180*img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-PI / 180 * img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}