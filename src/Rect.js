class Rect {
  constructor(row, col, width, height, color) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  get rgba() {
    const regex = new RegExp(/\d{1,3}/, "g");
    const colors = Array.from(this.color.matchAll(regex));
    return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, .6)`;
  }

  draw(cx) {
    cx.beginPath();
    const grad = cx.createLinearGradient(
      this.col * this.width,
      this.row * this.height,
      this.col * this.width + this.width,
      this.row * this.height + this.height
    );
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, this.rgba);
    cx.fillStyle = grad;
    cx.strokeStyle = "black";

    cx.fillRect(
      this.col * this.width + 5,
      this.row * this.height + 5,
      this.width - 5,
      this.height - 5
    );
    cx.strokeRect(
      this.col * this.width + 5,
      this.row * this.height + 5,
      this.width - 5,
      this.height - 5
    );
    cx.fill();
    cx.stroke();
    cx.closePath();
  }
}

export default Rect;
