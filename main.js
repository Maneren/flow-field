const grid = [];
let time = 0;
const particles = [];
const particleCount = 1;
const res = 25;
const half_res = res / 2;

function setup() {
  createCanvas(1000, 600);

  for (let y = 0; y < floor(height / res) + 1; y++) {
    grid[y] = [];
    for (let x = 0; x < floor(width / res) + 1; x++) {
      let angle = map(noise(x / 10, y / 10, time), 0, 1, 0, TWO_PI);
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      grid[y][x] = v;
    }
  }
  for (let i = 0; i < particleCount; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
  background(255);
}



function draw() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let v = grid[y][x];
      let angle = map(noise(x / 10, y / 10, time), 0, 1, 0, TWO_PI);
      v.rotate(angle - v.heading());
    }
  }
  time += 0.005;

  for (let particle of particles) {
    let x = floor(particle.pos.x / res);
    let y = floor(particle.pos.y / res);

    let force = grid[y][x];
    particle.applyForce(force);

    let drag = particle.vel.copy().mult(-0.2);
    particle.applyForce(drag);

    /*for (let particle2 of particles) {
      if(particle.pos.x === particle2.pos.x || particle.pos.y === particle2.pos.y) continue;
      let repulsion = particle.pos.copy().sub(particle2.pos);
      repulsion.set(1 / repulsion.x, 1 / repulsion.y);
      console.log(particle, particle2, repulsion);
      particle.applyForce(repulsion);
    }*/

    particle.update();
  }


  background(255, 30)
  for (let particle of particles) {
    // particle.show();
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let v = grid[y][x];
      strokeWeight(1)
      push();
      let centerX = res * y + half_res;
      let centerY = res * x + half_res;
      translate(centerX, centerY);
      line(0, 0, v.x * half_res, v.y * half_res);
      pop();
    }
  }
}