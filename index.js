const ball = document.getElementById("ball");
const arena = document.getElementById("arena");
const arenaStyle = window.getComputedStyle(arena);
const time = document.getElementById("time");
const score = document.getElementById("score");
let createPinInterval = 8000;
let createEnemyInterval = (Math.floor(Math.random() * (10 - 3) + 3)) * 1000;
console.log(createEnemyInterval);
let arenaLeft = arena.offsetLeft;
let arenaHeight = arena.offsetHeight;
let arenaRight = arena.offsetLeft + 700;
let allPins = [];
let allEnemies = [];
let scoreCount = 30;
score.innerHTML = "Score: " + scoreCount;
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
  let realNMEHeight = 300;
  // genNMEHeight();
  realNME.style.top = realNMEHeight + "px";
  let leftStyle = arenaLeft + 300;
  realNME.style.left = leftStyle + "px";
  realNME.setAttribute("class", "bad-pin");
  realNME.setAttribute("left", leftStyle);
  realNME.setAttribute("top", realNMEHeight);
  allEnemies.push(realNME);
  arena.appendChild(realNME);
  return realNME;
}

function moveRealNME(enemies){
  for (var i = 0; i < enemies.length; i++){
    let enemy = enemies[i];
    let thisLeft = parseInt(enemy.attributes.left.nodeValue);
      if (moveNmeDown){
        thisLeft+=1;
      }
      enemy.setAttribute("left", thisLeft);
      enemy.style.left = thisLeft + "px";
  }
}



let thisone = createRealEnemy();

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
    decreasePoints();
    left = true;
    right = false;
  }
  if (ballLeft <= arenaLeft){
    decreasePoints();
    left = false;
    right = true;
  }

  if (ballTop >= arenaHeight + 50){
    decreasePoints();
    up = true;
    down = false;
  }
  if (ballTop <= ((arenaHeight + 100) - arenaHeight)){
    decreasePoints();
    down = true;
    up = false;
  }else if (ballTop < 5){
    decreasePoints();
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

function decreasePoints(){
  scoreCount -= 1;
  score.innerHTML = "Score: " + scoreCount;
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
    // if (direction.right){
    //   boostDirection();
    //   return;
    // }
    directionReset("right");
    go = true;
    up=false;
    down=false;
    left = false;
    right = true;
    //num+=20;
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
  closeTimer();
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
    closeTimer();
    resume();
  }else {
    timer();
    pause();
  }
}
//create a new enemy
//append to DOM
//start it moving
// window.setInterval(() => {
//   createPin();
// }, createPinInterval);

// window.setInterval(() => {
//   createRealEnemy();
// }, createEnemyInterval);



function moveEm(pins){
  for(var i = 0; i < pins.length; i++){
    let thisTop = parseInt(pins[i].attributes.top.nodeValue);
    movePins(pins[i]);
  }
}

let requestId;
// let sshape = createEnemy();
 function mainLoop(){
  //  moveRealNME(allEnemies);
  //  lateralClash(allEnemies);
  lateralClash(thisone);
   movePins(allPins);
   clash(allPins);
   moveObjX();
   requestId = window.requestAnimationFrame(mainLoop);
  }

  function clash(shapes){
    let leftSide = ballLeft;
    let rightSide = ballLeft + 50;
    for (var i = 0; i < shapes.length; i++){
    let shape = shapes[i];
    let shapeTopper = parseInt(shape.attributes.top.nodeValue);
    let insideLeftNum = parseInt(shape.attributes.leftnum.nodeValue);
    insideLeftNum+=15;
    if ((shapeTopper >= (ballTop - 30) && (shapeTopper <= (ballTop + 10)) ) && (insideLeftNum <= rightSide && insideLeftNum >= leftSide)){
      hideEnemy(shape);
    }else if (shapeTopper >= arenaHeight + 50) {
      hideEnemy(shape);
    }
    }
  }


  function lateralClash(enemy){
      let leftSide = ballLeft;
      let rightSide = ballLeft + 50;
      let ballBottom = ballTop + 50;
      let enemyTop = parseInt(enemy.attributes.top.nodeValue);
      let enemyBottom = enemyTop + 40;
      let enemyLeft = parseInt(enemy.attributes.left.nodeValue);
      let enemyRight = enemyLeft + 40;
      if ((ballTop === enemyBottom) && (ballLeft <= enemyLeft)){
        console.log('bottom left clash');
      }else if ((ballTop === enemyBottom) && (rightSide >= enemyRight)){
        console.log('bottom right clash');
      }else if((ballBottom === enemyTop) && (rightSide >= enemyLeft)){
        console.log('top left clash');
      }else if((ballBottom === enemyTop) && (leftSide >= enemyRight)){
        console.log('top right clash');
      }else if(((leftSide - enemyRight) <= 7) && ((ballTop - enemyTop) <= 5)){
        console.log('coming from the right');
      }
  }
  // function lateralClash(enemies){
  //   let leftSide = ballLeft;
  //   let rightSide = ballLeft + 50;
  //   let bottom = ballTop + 50;
  //   for (var i = 0; i < enemies.length; i++){
  //     let enemy = enemies[i];
  //     let enemyTop = parseInt(enemy.attributes.top.nodeValue);
  //     let enemyBottom = enemyTop + 30;
  //     let enemyLeft = parseInt(enemy.attributes.left.nodeValue);
  //     let enemyRight = enemyLeft + 30;
  //     if (ballTop >= enemyBottom && ballTop <= enemyTop && ballLeft <= enemyRight){
  //       hideEnemy(enemy);
  //     }
  //     if (enemyLeft >= arenaRight){
  //       hideEnemy(enemy);
  //     }
  //   }
  // }



  function hideEnemy(shape){
    shape.style.display = "none";
    removeEnemy(shape);
  }

  function removeEnemy(shape){
    if (shape.parentElement) {
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

let timerId;
function timer(){
  let now = 1;
  scoreCount-=1;
  time.innerHTML = "Time: " + now;
  score.innerHTML = "Score: " + scoreCount;
  timerId = setInterval(function() {
    now += 1;
    scoreCount-=1;
    time.innerHTML = "Time: " + now;
    score.innerHTML = "Score: " + scoreCount;
  }, 1000);
}

function closeTimer(){
  if (timerId){
    setTimeout(() => {
      window.clearInterval(timerId);
      time.innerHTML = "";
    }, 0);
}
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
      console.log(requestId);
      setTimeout(() => {
        window.cancelAnimationFrame(requestId);
      }, 0);

      //requestId = undefined;
    }
  }
