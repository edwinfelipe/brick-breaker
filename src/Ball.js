class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.stop = true;
    this.xdir = 1;
    this.ydir = -1;
  }

  draw(cx) {
    cx.beginPath();
    cx.fillStyle = "red";
    cx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    cx.fill();
    cx.closePath();
  }

  move() {
    if (!this.stop) {
      this.x = this.x + this.xdir * 3;
      this.y = this.y + this.ydir * 3;
    }
  }

  collide(width, player) {
    if (this.x - this.r <= 0 || this.x + this.r >= width) {
      this.xdir *= -1;
    } else if (this.y - this.r <= 0) {
      this.ydir *= -1;
    } else if (
      this.x - this.r >= player.x &&
      this.x + this.r <= player.x + player.width &&
      this.y + this.r == player.y
    ) {
      
      this.ydir *= -1;
      
    }
  }

  intersects(block) {
    return (
      this.x - this.r >= block.col * block.width &&
      this.x + this.r <= block.col * block.width + block.width &&
      this.y + this.r >= block.row * block.height &&
      this.y - this.r <= block.row * block.height + block.height
    );
  }
}

export default Ball;
