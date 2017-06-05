const ball = document.getElementById("ball");
const arena = document.getElementById("arena");
const arenaStyle = window.getComputedStyle(arena);
const time = document.getElementById("time");
const score = document.getElementById("score");
let arenaLeft = arena.offsetLeft;
let arenaHeight = arena.offsetHeight;
let arenaRight = arena.offsetLeft + 495;
let enemies = [];
let scoreCount = 30;
score.innerHTML = "Score: " + scoreCount;
let wdthSwitch = true;

let num = arenaLeft + 30;
let topper = 250;
let switchUp;
let increasing;
let left;
let right;
let up;
let down;
let go = true;
let crrntNme;





let moveNmeDown = true;
let nmeTopper;
let nmeBottom = 0;
let nmeRight = 10;
let nmeLeft;
function createEnemy(){
  nmeTopper = -50;

  let nme = document.createElement("div");
  nmeLeft = genNmeLeft();
  nme.style.top = nmeTopper + "px";
  nme.setAttribute("class", "nme-shape");
  nme.setAttribute("leftnum", nmeLeft);
  nme.setAttribute("top", nmeTopper);
  nme.style.left = nmeLeft + "px";
  enemies.push(nme);
  arena.appendChild(nme);
}

function genNmeLeft(){
  return Math.round(Math.random() * (arenaRight-arenaLeft) + arenaLeft);
}





function moveEnemy(shapes){
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
  if (num >= arenaRight){
    decreasePoints();
    left = true;
    right = false;
  }
  if (num <= arenaLeft){
    decreasePoints();
    left = false;
    right = true;
  }

  if (topper >= 300){
    decreasePoints();
    up = true;
    down = false;
  }
  if (topper <= 10){
    decreasePoints();
    down = true;
    up = false;
  }else if (topper < 5){
    decreasePoints();
    topper += 100;
  }
  if (right){
    num+=2;
  }
  if (left){
    num-=2;
  }
  if(up){
    topper-=2;
  }
  if(down){
    topper+=2;
  }
  ball.style.left = num + "px";
  ball.style.top = topper + "px";
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
  num+=15;
  ball.style.left = num + "px";
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
window.setInterval(() => {
  createEnemy();
}, 2000);

function moveEm(nmes){
  for(var i = 0; i < nmes.length; i++){
    let thisTop = parseInt(nmes[i].attributes.top.nodeValue);
    moveEnemy(nmes[i]);
  }
}

let requestId;
let sshape = createEnemy();
 function mainLoop(){
   moveEnemy(enemies);
  clash(enemies);
   moveObjX();
   requestId = window.requestAnimationFrame(mainLoop);
  }

  function clash(shapes){
    let leftSide = num;
    let rightSide = num + 50;
    for (var i = 0; i < shapes.length; i++){
    let shape = shapes[i];
    let shapeTopper = parseInt(shape.attributes.top.nodeValue);
    let insideLeftNum = parseInt(shape.attributes.leftnum.nodeValue);
    insideLeftNum+=15;
    if ((shapeTopper >= (topper - 30) && (shapeTopper <= (topper + 10)) ) && (insideLeftNum <= rightSide && insideLeftNum >= leftSide)){
      hideEnemy(shape);
    }else if (shapeTopper >= arenaHeight) {
      hideEnemy(shape);
    }
    }
  }

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
