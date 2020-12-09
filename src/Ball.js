class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.stop = true;
    this.xdir = 1;
    this.ydir = -1;
  }

  get left() {
    return this.x - this.r;
  }

  get right() {
    return this.x + this.r;
  }

  get top() {
    return this.y - this.r;
  }

  get bottom() {
    return this.y + this.r;
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
    const isInXRange = this.left <= block.right && this.right >= block.left;
    const isInYRange = this.top <= block.bottom && this.bottom >= block.top;
    if (
      isInXRange &&
      ((this.bottom >= block.top && this.top <= block.top) ||
        (this.top <= block.bottom && this.bottom >= block.bottom))
    ) {
      return 1;
    }
    if (
      isInYRange &&
      ((this.right >= block.left && this.left <= block.right) ||
        (this.left <= block.right && this.right >= block.left))
    ) {
      return 2;
    }
    return 0;
  }
}

export default Ball;
