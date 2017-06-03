/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Ball = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Ball {
  constructor(height, width, arena){
    this.height = height + "px";
    this.width = width + "px";
    this.direction = {};
    this.go = true;
    this.topper = 10;
    this.righter = 0;
    this.x = 50;
    this.y = 50;
    this.arena = arena;
  }

  moveBall(){
    if (this.righter >= 500){
      this.left = true;
      this.right = false;
    }

    if (this.num <= 10){
      this.left = false;
      this.right = true;
    }

    if (this.topper >= 300){
      this.up = true;
      this.down = false;
    }

    if (this.topper <= 10){
      this.down = true;
      this.up = false;
    } else if (this.topper < 5){
      this.topper += 100;
    }

    if (this.right){
      this.righter+=1;
    }
    if (this.left){
      this.righter-=1;
    }
    if (this.up){
      this.topper-=1;
    }
    if (this.down){
      this.topper+=1;
    }

    this.left = this.righter + "px";
    this.top = this.topper + "px";
  }

  goUp(){
    this.directionReset("up");
    this.go = true;
    this.right = false;
    this.left = false;
    this.down = false;
    this.up = true;
  }

  goDown(){
    this.directionReset("down");
    this.go = true;
    this.right = false;
    this.left = false;
    this.up = false;
    this.down = true;
  }

  goRight(){
    this.directionReset("right");
    this.go = true;
    this.left = false;
    this.up = false;
    this.down = false;
    this.right = true;
    this.moveBall();
  }

  redrawRight(){
    // this.ctx.clearRect(this.x, this.y, 50, 50);
    // this.x+=2;
    // this.ctx.fillStyle = 'orange';
    // this.ctx.fillRect(this.x-1, this.y, 50, 50);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(this.x, this.y, 50, 50);
    if (this.x >= this.arena.arena.width-35){
      this.x-=10;
    }
    console.log(this.x);
    this.x+=10;
    this.ctx.fillStyle = 'black';
    //this.ctx.fillRect(this.x-2, this.y, 50, 50);
    this.ctx.beginPath();
    this.ctx.arc(this.x-10, this.y, 30, 0, Math.PI * 2, true);

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = 'red';

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 25, 0, Math.PI * 2, true);
    //this.ctx.stroke();
    //this.ball.ctx.fillRect(10, 10, this.cellSize, this.cellSize);
    this.ctx.fill();
  }

  redrawLeft(){
    this.ctx.fillStyle = 'black';
    if (this.x <= 35){
      this.x+=10;
      //window.clearInterval(this.leftId);
      this.ctx.beginPath();
      this.ctx.arc(this.x-6, this.y, 30, 0, Math.PI * 2, true);

      this.ctx.fill();
      this.ctx.closePath();
    }
    this.x-=10;
    this.ctx.fillStyle = 'black';
    //this.ctx.fillRect(this.x-2, this.y, 50, 50);
    this.ctx.beginPath();
    this.ctx.arc(this.x+10, this.y, 30, 0, Math.PI * 2, true);

    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = 'red';

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 25, 0, Math.PI * 2, true);
    //this.ctx.stroke();
    //this.ball.ctx.fillRect(10, 10, this.cellSize, this.cellSize);
    this.ctx.fill();
  }

  gogoRight(){
    window.clearInterval(this.leftId);
    this.rightId = requestAnimationFrame(

      this.redrawRight.bind(this)
    );
  }

  gogoLeft(){
    window.clearInterval(this.rightId);
    this.leftId = requestAnimationFrame(

      this.redrawLeft.bind(this)
    );
  }

  goLeft(){
    this.directionReset("left");
    this.go = true;
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = true;
  }

  directionReset(type){
    this.direction = {};
    this.direction[type] = true;
  }

  resume(){
    if (this.direction.right){
      this.right = true;
      this.direction = {};
    }else if (this.direction.left){
      this.left = true;
      this.direction = {};
    }else if (this.direction.up){
      this.up = true;
      this.direction = {};
    }else if (this.direction.down){
      this.down = true;
      this.direction = {};
    }
  }



}

module.exports = Ball;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(0);
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


/***/ })
/******/ ]);