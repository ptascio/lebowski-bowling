const Ball = require('./ball');

class GameView {
  constructor(){
    this.arena = document.getElementById("canvas");
    this.ctx = this.arena.getContext("2d");
    this.cellSize = 50;
    this.ball = new Ball(this.arena.width % 100, this.arena.height % 100, this);
    this.ball.ctx = this.ctx;
  }

  drawArena(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.arena.width, this.arena.height);
  }

  drawBall(){
    this.ball.ctx.fillStyle = 'red';

    this.ball.ctx.beginPath();
    this.ball.ctx.arc(50, 50, 25, 0, Math.PI * 2, true);
    //this.ball.ctx.stroke();
    //this.ball.ctx.fillRect(10, 10, this.cellSize, this.cellSize);
    this.ball.ctx.fill();
    this.ball.ctx.closePath();
      //this.ball.ctx.globalCompositeOperation = 'destination-out';
  }
}

module.exports = GameView;
