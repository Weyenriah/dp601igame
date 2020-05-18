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
  /*running: [
    'running1',
    'running2',
  ],*/
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
    /*if(keyIsDown(LEFT_ARROW)) {
      for(i = 0; i < this.running.length; i++) {
        image(images[this.running[i]], this.x, this.y, this.width, this.height);
      }
    } else if(keyIsDown(RIGHT_ARROW)) {
      rect(this.x, this.y, ((frameCount % 10) * -this.width) * deltaTime / 1000, this.height);
    } else if(keyIsDown(UP_ARROW)) {
      rect(this.x, this.y, this.width, /*((frameCount % 10) * this.height) * deltaTime / 1000);
    } else {
      rect(this.x, this.y, this.width, this.height);
    }*/
  },
  isOnObject (object) {
    return player.y + player.height === object.y && player.x + player.width > object.x && player.x < object.x + object.width
  },
  isOnObjects (objects) {
    return objects.some(this.isOnObject)
  }
};