class Rect {
  constructor(row, col, width, height, color) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.color = color;
    this.offset = 50;
  }

  get left() {
    return this.col * this.width;
  }

  get right() {
    return this.col * this.width + this.width;
  }

  get top() {
    return this.row * this.height + this.offset;
  }

  get bottom() {
    return this.row * this.height + this.height + this.offset;
  }

  get rgba() {
    const regex = new RegExp(/\d{1,3}/, "g");
    const colors = Array.from(this.color.matchAll(regex));
    return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, .6)`;
  }

  draw(cx) {
    cx.beginPath();
    const grad = cx.createLinearGradient(
      this.left,
      this.top,
      this.right,
      this.bottom
    );
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, this.rgba);
    cx.fillStyle = grad;
    cx.strokeStyle = "black";

    cx.fillRect(this.left + 5, this.top + 5, this.width - 5, this.height - 5);
    cx.strokeRect(this.left + 5, this.top + 5, this.width - 5, this.height - 5);
    cx.fill();
    cx.stroke();
    cx.closePath();
  }
}

export default Rect;
