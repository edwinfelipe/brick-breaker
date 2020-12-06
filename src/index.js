import Game from './Game';
import level from './level';
let game;

function main(){
    game = new Game(level);
    game.init();
    cycle();
}

function cycle(){
    window.requestAnimationFrame(cycle);
    game.run();
}



main();