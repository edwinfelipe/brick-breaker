class Player {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = 12;
  }

  draw(cx) {
    cx.beginPath();
    cx.fillStyle = "grey";
    cx.strokeStyle = "black";
    cx.fillRect(this.x, this.y, this.width, this.height);
    cx.strokeRect(this.x, this.y, this.width, this.height);
    cx.fill();
    cx.stroke();
    cx.closePath();
  }

  move(key) {
    switch (key) {
      case "ArrowLeft":
        this.x > 10 ? (this.x -= 10) : null;
        break;
      case "ArrowRight":
        this.x < 400 - this.width ? (this.x += 10) : null;
        break;
      default:
        null;
    }
  }
  follow(x){
    this.x = x - this.width/2;
  }
}

export default Player;
