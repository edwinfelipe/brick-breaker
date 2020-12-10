import Game from "./Game";
import levels from "./levels";
let game;
function main() {
  game = new Game(levels);
  game.init();
  console.log(game.ball, game.player);
  cycle();
}

function cycle() {
  window.requestAnimationFrame(cycle);
  game.run();
}

main();

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    game.ball.stop = false;
    return;
  }
  if (!game.ball.stop) game.player.move(e.key);
});
