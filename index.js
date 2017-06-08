const ball = document.getElementById("ball");
const arena = document.getElementById("arena");
const score = document.getElementById("score");
let createPinInterval = 8000;
let createEnemyInterval = (Math.floor(Math.random() * (10 - 3) + 3)) * 1000;
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

let moveNmeDown = true;

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

function genNmeLeft(){
  return Math.round(Math.random() * (arenaRight-arenaLeft) + arenaLeft);
}

function genNMEHeight(){
  let arenaTop = arenaHeight - 500;
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
  return realNME;
}

// function createBonus(){
//   let bonus = document.createElement("div");
//   bonus.classList.add('white-russian','general-shape');
//   arena.appendChild(bonus);
// }
// createBonus();
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


function movePins(shapes){
  for (var i = 0; i < shapes.length; i++){
    let shape = shapes[i];
    let thisTop = parseInt(shape.attributes.top.nodeValue);

    if (moveNmeDown){
      thisTop += 1;
    }
    shape.setAttribute("top", thisTop);
    shape.style.top = thisTop + "px";
  }
}

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
  if (ballTop <= ((arenaHeight + 100) - arenaHeight)){
    down = true;
    up = false;
  }else if (ballTop < 5){
    ballTop += 100;
  }
  if (right){
    ballLeft+=2;
  }
  if (left){
    ballLeft-=2;
  }
  if(up){
    ballTop-=2;
  }
  if(down){
    ballTop+=2;
  }
  ball.style.left = ballLeft + "px";
  ball.style.top = ballTop + "px";
}

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

let directionTypes = [up, down, right, left];
function directionReset(type){
  direction = {};
  direction[type] = true;
}

function boostDirection(){
  ballLeft+=15;
  ball.style.left = ballLeft + "px";
}

window.addEventListener("keydown", spacey, false);

function toggleGo(){
  go = !go;
  if (go) {
    resume();
  }else {
   pause();
  }
}



 // window.setInterval(() => {
 //   createPin();
 // }, createPinInterval);


window.setInterval(() => {
  createRealEnemy();
}, (createPinInterval+3000));



function moveEm(pins){
  for(var i = 0; i < pins.length; i++){
    let thisTop = parseInt(pins[i].attributes.top.nodeValue);
    movePins(pins[i]);
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

  function increaseScore(){
    if (scoreCount % 100 === 0){
      createPinInterval-=500;
    }
    if (scoreCount % 200 === 0){
      nmeSpeed+=1;
    }
    ball.classList.add("ball-gain-1");
    resetBallClass("ball-gain-1");
    scoreCount+=10;
    score.innerText = "Score: " + scoreCount;
  }

  let decrease = false;
  function decreaseScore(){
    if (decrease){
      ball.classList.add("ball-lose-1");
      resetBallClass("ball-lose-1");
      decrease = false;
      scoreCount-=5;
      score.innerText = "Score: " + scoreCount;
    }
  }

  function resetBallClass(type){
    window.setTimeout(() => {
      ball.classList.remove(type);
    }, 500);
  }

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
    if (bottomOfPin >= arenaHeight){
        allPins.splice(i, 1);
        hideShape(pin);
    }
    if (checkClash(leftOfPin, rightOfPin, topOfPin, bottomOfPin)) {
      clashHappened(i, pin, allPins);
      scoredPoints = true;
      increaseScore();
    }

    // if ((shapeTopper >= (ballTop - 30) && (shapeTopper <= (ballTop + 10)) ) && (insideLeftNum <= rightSide && insideLeftNum >= leftSide)){
    //   allPins.splice(i, 1);
    //   scoredPoints = true;
    //   hideShape(shape);
    // }else if (shapeTopper >= arenaHeight + 50) {
    //   allPins.splice(i, 1);
    //   hideShape(shape);
    // }
    }
  }


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
      // if (((ballTop - enemyBottom) <= 0) && ((enemyRight - leftSide) <= 50) && (enemyRight >= leftSide) && (ballTop>=enemyTop)){
      //   enemies.splice(i, 1);
      //   hideShape(enemy);
      //   decrease = true;
      //   decreaseScore();
      // }else if(((enemyTop - ballBottom) <= 0) && ((enemyRight - leftSide) <= 50) && (enemyRight >= leftSide) && (enemyTop>=ballBottom)){
      //   enemies.splice(i, 1);
      //   hideShape(enemy);
      //   decrease = true;
      //   decreaseScore();
      // }else if(((leftSide - enemyRight) <= 5) && ((enemyTop - ballBottom) <= 5) && ((ballTop - enemyBottom)<=5) && (enemyLeft < leftSide)){
      //   enemies.splice(i, 1);
      //   hideShape(enemy);
      //   decrease = true;
      //   decreaseScore();
      // }else if(((enemyLeft - rightSide) <= 5) && ((enemyTop - ballBottom) <= 5) && ((ballTop - enemyBottom)<=5) && (enemyRight > rightSide)){
      //   enemies.splice(i, 1);
      //   hideShape(enemy);
      //   decrease = true;
      //   decreaseScore();
      // }
    }
  }

  function checkClash(shapeLeft, shapeRight, shapeTop, shapeBottom){
    //going to need to make attribute names the same
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

  function clashHappened(index, shape, shapesArray){
    shapesArray.splice(index, 1);
    hideShape(shape);
  }

  function hideShape(shape){
    shape.style.display = "none";
    removeEnemy(shape);
  }

  function removeEnemy(shape){
    if (shape.parentElement) {
      if (scoredPoints){
        scoredPoints = false;
      }
      shape.parentElement.removeChild(shape);
    }
  }

  function start(){
    createPin();
    if (!requestId){
      mainLoop();
    }
  }

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


  document.addEventListener("DOMContentLoaded", () => {
      start();
  });

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

  function stop(){
    if (requestId){
      setTimeout(() => {
        window.cancelAnimationFrame(requestId);
      }, 0);

      //requestId = undefined;
    }
  }
