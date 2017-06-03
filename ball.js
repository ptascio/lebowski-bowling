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
