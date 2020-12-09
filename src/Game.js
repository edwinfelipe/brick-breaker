import Player from "./Player";
import Ball from "./Ball";
import Rect from "./Rect";

class Game {
  constructor(level) {
    this.cv = document.getElementById("lienzo");
    this.cv.width = 405;
    this.cv.height = 600;
    this.cx = this.cv.getContext("2d");
    this.player = new Player(this.cv.width / 2 - 30, this.cv.height - 20, 60);
    this.ball = new Ball(this.cv.width / 2, this.cv.height - 27, 7);
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
    this.player.draw(this.cx);
    this.ball.draw(this.cx);
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

  _actions() {
    this.ball.collide(this.cv.width, this.player);
    for(let i = 0; i <this.blocks.length; i++){
      if(this.ball.intersects(this.blocks[i])){
        this.ball.ydir *= -1;
        this.blocks.splice(i,1);
        break;
      }
    }
    this.ball.move();
    this.player.follow(this.ball.x);
  }

  init() {
    this._generateLevel();
  }

  run() {
    this._actions();
    this._draw();
  }
}

export default Game;
