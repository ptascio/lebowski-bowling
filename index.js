const ball = document.getElementById("ball");
const arena = document.getElementById("arena");
const arenaStyle = window.getComputedStyle(arena);
const time = document.getElementById("time");
const score = document.getElementById("score");

let enemies = [];
let scoreCount = 30;
score.innerHTML = "Score: " + scoreCount;
let wdthSwitch = true;

let num = 20;
let topper = 20;
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
  return nme;
}

function genNmeLeft(){
  return Math.floor(Math.random() * 200) + 10;
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
  if (num >= 500){
    decreasePoints();
    left = true;
    right = false;
  }
  if (num <= 10){
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
    num+=1;
  }
  if (left){
    num-=1;
  }
  if(up){
    topper-=1;
  }
  if(down){
    topper+=1;
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
    let rightSide = num - 10;
    let leftSide = num + 40;
    for (var i = 0; i < shapes.length; i++){
    let shape = shapes[i];
    let shapeTopper = parseInt(shape.attributes.top.nodeValue);
    let insideLeftNum = parseInt(shape.attributes.leftnum.nodeValue);
    if ((shapeTopper >= (topper - 30)) && (insideLeftNum >= rightSide && insideLeftNum <= leftSide)){
      removeEnemy(shape);
    }else if (shapeTopper >= 310) {
      removeEnemy(shape);
    }
    }
  }

  function removeEnemy(shape){
    shape.style.display = "none";
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
