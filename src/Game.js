import Player from "./Player";
import Ball from "./Ball";
import Rect from "./Rect";

class Game {
  constructor(levels) {
    this.cv = document.getElementById("lienzo");
    this.cv.width = 405;
    this.cv.height = 600;
    this.cx = this.cv.getContext("2d");
    this.player = new Player(this.cv.width / 2 - 30, this.cv.height - 20, 60);
    this.ball = new Ball(this.cv.width / 2, this.cv.height - 28, 7);
    this.levels = levels;
    this.ActualLevel = 1;
    this.level = levels[this.ActualLevel - 1];
    this.blocks = [];
    this.score = 0;
    this.lifes = 3;
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
    this._drawStatusBar();
    for (let block of this.blocks) {
      block.draw(this.cx);
    }
    this.player.draw(this.cx);
    this.ball.draw(this.cx);
  }
  _drawStatusBar() {
    this.cx.fillStyle = "black";
    this.cx.fillRect(0, 0, this.cv.width, 50);
    this.cx.fill();

    this.cx.fillStyle = "white";
    this.cx.font = "18pt MarkerFelt-Thin, Comic Sans MS";

    this.cx.fillText("Lifes: ", 10, 34);
    this.cx.fillText(`Score: ${this.score}`, 160, 34);
    this.cx.fillText(`Level: ${this.ActualLevel}`, 300, 34);
    this.cx.fill();

    this.cx.fillStyle = "red";
    for (let i = 0; i < this.lifes; i++) {
      this.cx.arc(i * 16 + 88, 28, 6, 0, Math.PI * 2, false);
    }
    this.cx.fill();
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

  _fallBall() {
    this.lifes--;
    this.player.x = this.cv.width / 2 - this.player.width / 2;
    this.ball.x = this.cv.width / 2;
    this.ball.y = this.cv.height - 28;
    this.ball.xdir = 1;
    this.ball.ydir = -1;
    this.ball.stop = true;
  }

  _restart() {
    this.lifes = 3;
    this.score = 0;
    this._generateLevel();
  }
  _nextLevel(){
    this.player.x = this.cv.width / 2 - this.player.width / 2;
    this.ball.x = this.cv.width / 2;
    this.ball.y = this.cv.height - 28;
    this.ball.xdir = 1;
    this.ball.ydir = -1;
    this.ball.stop = true;

    this.ActualLevel += 1;
    this.level = this.levels[this.ActualLevel - 1];
    this._generateLevel();
  }

  _actions() {
    this.ball.collide(this.cv.width, this.player);
    for (let i = 0; i < this.blocks.length; i++) {
      const intersects = this.ball.intersects(this.blocks[i]);

      if (intersects === 1) {
        this.ball.ydir *= -1;
      } else if (intersects === 2) {
        this.ball.xdir *= -1;
      }

      if (intersects) {
        this.blocks.splice(i, 1);
        this.score += 10;
        break;
      }
    }
    this.ball.move();
    this.player.follow(this.ball.x);
  }
  _eventLoop() {
    if (this.ball.bottom >= this.cv.height) {
      this._fallBall();
    }
    if (this.lifes <= 0) {
      this._restart();
    }
  
    if(this.blocks.length === 0){
      this._nextLevel();
    }
  }
  init() {
    this._generateLevel();
  }

  run() {
    this._eventLoop();
    this._actions();
    this._draw();
  }
}

export default Game;
