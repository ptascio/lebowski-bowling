"use strict";

class Enemy extends HTMLElement{
  constructor(options){
    super();
    debugger
    this.top = options.top;
  }

  moveDown(){
    this.top += 0.5;
  }

  connectedCallback(){}
  disconnectedCallback(){}
  attributeChangedCallback(){}
}

window.module = window.module || {};
module.exports = Enemy;
