# brick-breaker
Classic brick breaker game

## Game Demo
  [Click Here](https://edwinfelipe.github.io/brick-breaker/)

## Instructions

- Install depencencies
  ```console
    npm install
  ```
- Build project
  ```console
    npx webpack
  ```
 
 ## Notes
 - The game can be played but is still under development, if you wish, you can make a pull request with the changes you need,add levels, design ui, etc.
 - The game is in autoplay mode, if you wish to play by yourself in Game.js file, comment this line.
  ```js
    this.player.follow(this.ball.x)
  ```
