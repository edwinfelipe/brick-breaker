import Game from './Game';
import level from './level';
let game;
let started = false;
function main(){
    game = new Game(level);
    game.init();
    console.log(game.ball, game.player);
    cycle();
}

function cycle(){
    window.requestAnimationFrame(cycle);
    game.run();
}



main();

window.addEventListener('keydown', (e)=>{
    if(e.key === " " && !started){
        game.ball.stop = false;
        game.ball.ydir = 1;
        started = true;
        return;
    }
    game.player.move(e.key);
})