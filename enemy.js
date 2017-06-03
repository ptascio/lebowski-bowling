class Enemy {
  constructor(options){
    this.top = options.top;
    debugger
  }

  moveDown(){
    this.top += 0.5;
  }
}

window.module = window.module || {};
module.exports = Enemy;
