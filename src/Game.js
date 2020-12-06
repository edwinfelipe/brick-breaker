import Rect from "./Rect";

class Game {
  constructor(level) {
    this.cv = document.getElementById("lienzo");
    this.cv.width = 405;
    this.cv.height = 600;
    this.cx = this.cv.getContext("2d");
    this.level = level;
    this.blocks = [];
    this.colors = [
      "rgb(255,0,0)",
      "rgb(0,255,255)",
      "rgb(0,0,255)",
      "rgb(128,0,128)",
      "rgb(255,128,0)",
    ];
  }

  _draw() {
    this._clear();
    for (let block of this.blocks) {
      block.draw(this.cx);
    }
  }

  _generateLevel() {
    for (let row = 0; row < this.level.length; row++) {
      for (let col = 0; col < this.level[row].length; col++) {
        if (this.level[row][col] === 1)
          this.blocks.push(new Rect(row, col, 80, 30, this.colors[col]));
      }
    }
  }

  _clear() {
    this.cx.beginPath();
    this.cx.fillStyle = "#ddd";
    this.cx.strokeStyle = "#000";

    this.cx.fillRect(0, 0, this.cv.width, this.cv.height);
    this.cx.strokeRect(0, 0, this.cv.width, this.cv.height);
    this.cx.fill();
    this.cx.stroke();

    this.cx.closePath();
  }

  _actions() {}

  init() {
    this._generateLevel();
  }

  run() {
    this._actions();
    this._draw();
  }
}

export default Game;
