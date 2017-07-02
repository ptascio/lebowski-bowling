const ball = document.getElementById("ball");
const arena = document.getElementById("arena");
const score = document.getElementById("score");
let createPinInterval = 8000;
let createEnemyInterval = 9000;
let arenaLeft = arena.offsetLeft;
let arenaHeight = arena.offsetHeight;
let arenaRight = arena.offsetLeft + 700;
let allPins = [];
let allEnemies = [];
let scoreCount = 0;
score.innerText = "Score: " + scoreCount;
let wdthSwitch = true;
let ballLeft = ((arenaLeft + arenaRight)/2);
let ballTop = arenaHeight+50;
let switchUp;
let increasing;
let left;
let right;
let up;
let down;
let go = true;
let crrntNme;
let energyBar = document.getElementById("energy");
let energy = 100;

//all enemies
let moveNmeDown = true;

function genNmeLeft(){
  return Math.round(Math.random() * (arenaRight-arenaLeft) + arenaLeft);
}

function genNMEHeight(){
  let arenaTop = arenaHeight - 450;
  return Math.round(Math.random() * (arenaHeight-arenaTop) + arenaTop);
}

function createRealEnemy(){
  let realNME = document.createElement("div");
  let realNMEHeight = genNMEHeight();
  realNME.style.top = realNMEHeight + "px";
  let leftStyle = arenaLeft;
  realNME.style.left = leftStyle + "px";
  realNME.setAttribute("class", "bad-pin");
  realNME.setAttribute("left", leftStyle);
  realNME.setAttribute("top", realNMEHeight);
  allEnemies.push(realNME);
  arena.appendChild(realNME);
  setTimeout(createRealEnemy, createEnemyInterval);
  return realNME;
}

let nmeSpeed = 1;
function moveRealNME(enemies){
  for (var i = 0; i < enemies.length; i++){
    let enemy = enemies[i];
    let thisLeft = parseInt(enemy.attributes.left.nodeValue);
      if (moveNmeDown){
        thisLeft+=nmeSpeed;
      }
      enemy.setAttribute("left", thisLeft);
      enemy.style.left = thisLeft + "px";
  }
}

//all pins
let pinTopper;
let pinBottom = 0;
let pinRight = 10;
let pinLeft;
function createPin(){
  pinTopper = ((arenaHeight + 55) - arenaHeight);
  let pin = document.createElement("div");
  pinLeft = genNmeLeft();
  pin.style.top = pinTopper + "px";
  pin.setAttribute("class", "pin-shape");
  pin.setAttribute("leftnum", pinLeft);
  pin.setAttribute("top", pinTopper);
  pin.style.left = pinLeft + "px";
  allPins.push(pin);
  arena.appendChild(pin);
  setTimeout(createPin, createPinInterval);
}


let pinSpeed = 1;
let movePinDown = true;
function movePins(shapes){
  for (var i = 0; i < shapes.length; i++){
    let shape = shapes[i];
    let thisTop = parseInt(shape.attributes.top.nodeValue);

    if (movePinDown){
      thisTop += pinSpeed;
    }
    shape.setAttribute("top", thisTop);
    shape.style.top = thisTop + "px";
  }
}

//ball movement
var ballSpeed = 2;
function moveObjX(){
  if (ballLeft >= arenaRight){
    left = true;
    right = false;
  }
  if (ballLeft <= arenaLeft){
    left = false;
    right = true;
  }

  if (ballTop >= arenaHeight + 50){
    up = true;
    down = false;
  }
  if (ballTop <= ((arenaHeight + 120) - arenaHeight)){
    down = true;
    up = false;
  }else if (ballTop < 5){
    ballTop += 100;
  }
  if (right){
    ballLeft+=ballSpeed;
  }
  if (left){
    ballLeft-=ballSpeed;
  }
  if(up){
    ballTop-=ballSpeed;
  }
  if(down){
    ballTop+=ballSpeed;
  }
  ball.style.left = ballLeft + "px";
  ball.style.top = ballTop + "px";
}

//ball movement
let direction = {};
function spacey(e){
  e.preventDefault();
  if (e.keyCode === 32){
    toggleGo();
  }else if (e.keyCode === 38){
    directionReset("up");
    go = true;
    right=false;
    left=false;
    down=false;
    up=true;
  }else if (e.keyCode === 39){
    directionReset("right");
    go = true;
    up=false;
    down=false;
    left = false;
    right = true;
  }else if (e.keyCode === 40){
    directionReset("down");
    go = true;
    right=false;
    left=false;
    up=false;
    down=true;
  }else if (e.keyCode === 37){
    directionReset("left");
    go = true;
    down=false;
    up=false;
    right = false;
    left=true;
  }
}

//ball movement
let directionTypes = [up, down, right, left];
function directionReset(type){
  direction = {};
  direction[type] = true;
}

//ball movement
window.addEventListener("keydown", spacey, false);
//ball movement
function toggleGo(){
  go = !go;
  if (go) {
    resume();
  }else {
   pause();
  }
}

//ball css
function resetBallClass(type){
  window.setTimeout(() => {
    ball.classList.remove(type);
  }, 500);
}

//ball movement
  function resume(){
    if (direction.right){
      right = true;
      direction = {};
    }else if (direction.left){
      left = true;
      direction = {};
    }else if (direction.up){
      up = true;
      direction = {};
    }else if (direction.down){
      down = true;
      direction = {};
    }
  }
//ball movement
  function pause(){
    if (right){
      direction["right"] = true;
    }else if (left){
      direction["left"] = true;
    }else if (down){
      direction["down"] = true;
    }else if (up){
      direction["up"] = true;
    }
    left=false;
    right=false;
    down=false;
    up=false;
  }

//game play
  function increaseDifficulty(points){
    if (points % 100 === 0){
      createPinInterval-=1000;
    }
    if (points % 200 === 0){
      createEnemyInterval-=1000;
      nmeSpeed+=1;
    }
    if (points % 400 === 0){
      ballSpeed+=1;
      pinSpeed+=1;
    }
  }
//game play
  function increaseScore(){
    ball.classList.add("ball-gain-1");
    resetBallClass("ball-gain-1");
    scoreCount+=10;
    if (scoreCount > 0 && createPinInterval >= 3000){
      increaseDifficulty(scoreCount);
    }
    score.innerText = "Score: " + scoreCount;
  }
//game play
  let decrease = false;
  function decreaseScore(){
    if (decrease){
      shortenEnergyBar();
      ball.classList.add("ball-lose-1");
      resetBallClass("ball-lose-1");
      decrease = false;
      scoreCount-=10;
      score.innerText = "Score: " + scoreCount;
    }
  }

  function shortenEnergyBar(){
    energy -= 10;
    let nrgwdth = energy + "px";
    changeNrgColor();
    energyBar.style.width = nrgwdth;
  }

  function changeNrgColor(){
    if (energy === 0){
      stop();
    }else if ((energy >= 50) && (energy <= 70)){
      energyBar.style.backgroundColor = "#ffff00";
    }else if ((energy >= 30) && (energy <= 40)){
      energyBar.style.backgroundColor = "#ff7f00";
    }else if (energy < 30){
      energyBar.style.backgroundColor = "#ff0000";
    }
  }

//game play pins
  let scoredPoints = false;
  function clash(pins){
    let leftSide = ballLeft;
    let rightSide = ballLeft + 50;
    for (var i = 0; i < pins.length; i++){
      let pin = pins[i];
      let topOfPin = parseInt(pin.attributes.top.nodeValue);
      let leftOfPin = parseInt(pin.attributes.leftnum.nodeValue);
      let bottomOfPin = topOfPin + 40;
      let rightOfPin = leftOfPin + 40;
        if (bottomOfPin >= (arenaHeight + 100)){
          allPins.splice(i, 1);
          hideShape(pin);
        }
        if (checkClash(leftOfPin, rightOfPin, topOfPin, bottomOfPin)) {
          clashHappened(i, pin, allPins);
          scoredPoints = true;
          increaseScore();
        }
    }
  }

//game play enemies
  function lateralClash(enemies){
      let leftSide = ballLeft;
      let rightSide = ballLeft + 50;
      let ballBottom = ballTop + 50;
      for (var i = 0; i < enemies.length; i++){
        let enemy = enemies[i];
        let enemyTop = parseInt(enemy.attributes.top.nodeValue);
        let enemyBottom = enemyTop + 40;
        let enemyLeft = parseInt(enemy.attributes.left.nodeValue);
        let enemyRight = enemyLeft + 40;
        if (enemyRight >= arenaRight){
          hideShape(enemy);
        }
          if (checkClash(enemyLeft, enemyRight, enemyTop, enemyBottom)) {
            clashHappened(i, enemy, enemies);
            decrease = true;
            decreaseScore();
          }
    }
  }
//game play
  function checkClash(shapeLeft, shapeRight, shapeTop, shapeBottom){
    let leftSide = ballLeft;
    let rightSide = ballLeft + 50;
    let ballBottom = ballTop + 50;
    if (((ballTop - shapeBottom) <= 0) && ((shapeRight - leftSide) <= 50) && (shapeRight >= leftSide) && (ballTop>=shapeTop)){
      return true;
    }else if(((shapeTop - ballBottom) <= 0) && ((shapeRight - leftSide) <= 50) && (shapeRight >= leftSide) && (shapeTop>=ballBottom)){
      return true;
    }else if(((leftSide - shapeRight) <= 5) && ((shapeTop - ballBottom) <= 5) && ((ballTop - shapeBottom)<=5) && (shapeLeft < leftSide)){
      return true;
    }else if(((shapeLeft - rightSide) <= 5) && ((shapeTop - ballBottom) <= 5) && ((ballTop - shapeBottom)<=5) && (shapeRight > rightSide)){
      return true;
    }
  }
//game play
  function clashHappened(index, shape, shapesArray){
    shapesArray.splice(index, 1);
    hideShape(shape);
  }
//game play
  function hideShape(shape){
    shape.style.display = "none";
    removeEnemy(shape);
  }
//game play
  function removeEnemy(shape){
    if (shape.parentElement) {
      if (scoredPoints){
        scoredPoints = false;
      }
      shape.parentElement.removeChild(shape);
    }
  }

//functions to begin and continue play

document.addEventListener("DOMContentLoaded", () => {
    start();
});

function start(){
  createPin();
  createRealEnemy();
  if (!requestId){
    mainLoop();
  }
}

let requestId;
function mainLoop(){
  moveRealNME(allEnemies);
  lateralClash(allEnemies);
  movePins(allPins);
  clash(allPins);
  moveObjX();
  requestId = window.requestAnimationFrame(mainLoop);
}





//ball movement not in use
  let wdth = 50;
  let hgt = 50;
  function shrinkBox(){
    if (wdthSwitch){
      if (wdth === 10){
        wdthSwitch = false;
      }
      wdth-=5;
      hgt-=5;
    }else{
      if (wdth === 50){
        wdthSwitch = true;
      }
      wdth +=5;
      hgt+=5;
    }
      ball.style.width = wdth + "px";
      ball.style.height = hgt + "px";
  }

//game play, not in use
function stop(){
  if (requestId){
    setTimeout(() => {
      window.cancelAnimationFrame(requestId);
  }, 0);

      //requestId = undefined;
    }
  }
  //bonus character, not in use
  // function createBonus(){
  //   let bonus = document.createElement("div");
  //   bonus.classList.add('white-russian','general-shape');
  //   arena.appendChild(bonus);
  // }
  // createBonus();
