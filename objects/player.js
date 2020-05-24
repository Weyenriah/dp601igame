// Player
let player = {
  // Horizontal
  x: 200,
  // Vertical
  y: 0,
  speedX: 0,
  speedY: 0,
  height: 50,
  width: 50,
  movementSpeed: 30,
  color: {
    r: 0,
    g: 0,
    b: 0
  },
  stroke: 0,
  draw() {
    // (outer) perimeter of player
    let O = PI * this.width;
    rotate_and_draw_image(images.player, this.x, this.y, this.width, this.height, this.x / O * 360);
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