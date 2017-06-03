const GameView = require('./gameView');
let gameView;
let ball;
 document.addEventListener("DOMContentLoaded", () => {
  gameView = new GameView(540, 340);
  gameView.drawArena();
  gameView.drawBall();
 });

document.addEventListener("keydown", function(e){
  if (e.keyCode === 39){
    gameView.ball.gogoRight();
  } else if (e.keyCode === 37){
    gameView.ball.gogoLeft();
  }
});
