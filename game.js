const Ball = require('./ball');

class Game {
  constructor(){
    this.ball = new Ball(50, 50, "#4ca64c");
    this.ballId = document.getElementById("ball");
  }

  getMoving(){
    this.ball.moveBall();
  }
}

module.exports = Game;
