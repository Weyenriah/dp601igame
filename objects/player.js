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
  stroke: 0,
  draw() {
    stroke(this.stroke);
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.x, this.y, this.width, this.height);
  }
};