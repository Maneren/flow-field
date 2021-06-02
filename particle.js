class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prevPos = undefined;
    this.vel = createVector();
    this.acc = createVector();
  }
  
  applyForce(force){
    this.acc.add(force);
  }
  
  update(){
    this.vel.add(this.acc);
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    this.pos.x = (this.pos.x + width) % width;
    this.pos.y = (this.pos.y + height) % height;
    this.acc.mult(0);
  }
  
  show(){
    stroke(0);
    strokeWeight(1);
    let d = abs(this.prevPos.copy().sub(this.pos).mag());
    if (d < 10){
      line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    }
  }
}