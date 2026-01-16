/**
 * Flow Field Pattern
 * Creates organic, flowing lines using Perlin noise
 *
 * Great for: Background textures, artistic effects, data visualization
 */

// Configuration
const CONFIG = {
  scale: 20,           // Size of each flow cell
  noiseInc: 0.1,       // Noise increment (lower = smoother)
  particleCount: 1000, // Number of flowing particles
  maxSpeed: 2,         // Maximum particle speed
  fadeAmount: 5,       // Trail fade (0-255, lower = longer trails)
  colorMode: 'gradient' // 'single', 'gradient', 'rainbow'
};

let cols, rows;
let flowField;
let particles = [];
let zoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / CONFIG.scale);
  rows = floor(height / CONFIG.scale);
  flowField = new Array(cols * rows);

  for (let i = 0; i < CONFIG.particleCount; i++) {
    particles.push(new FlowParticle());
  }

  background(0);
}

function draw() {
  // Semi-transparent background for trails
  background(0, CONFIG.fadeAmount);

  // Update flow field
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += CONFIG.noiseInc;
    }
    yoff += CONFIG.noiseInc;
  }
  zoff += 0.002;

  // Update particles
  for (let p of particles) {
    p.follow(flowField);
    p.update();
    p.edges();
    p.show();
  }
}

class FlowParticle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = CONFIG.maxSpeed;
    this.prevPos = this.pos.copy();
    this.hue = random(360);
  }

  follow(vectors) {
    let x = floor(this.pos.x / CONFIG.scale);
    let y = floor(this.pos.y / CONFIG.scale);
    let index = x + y * cols;
    let force = vectors[index];
    if (force) {
      this.applyForce(force);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    let c;
    switch (CONFIG.colorMode) {
      case 'single':
        c = color(100, 200, 255, 50);
        break;
      case 'gradient':
        c = lerpColor(
          color(255, 100, 150),
          color(100, 200, 255),
          map(this.pos.y, 0, height, 0, 1)
        );
        c.setAlpha(50);
        break;
      case 'rainbow':
        colorMode(HSB, 360, 100, 100, 100);
        c = color(this.hue, 80, 100, 30);
        this.hue = (this.hue + 0.5) % 360;
        colorMode(RGB);
        break;
    }

    stroke(c);
    strokeWeight(1);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / CONFIG.scale);
  rows = floor(height / CONFIG.scale);
  flowField = new Array(cols * rows);
  background(0);
}

// Export controls
function keyPressed() {
  if (key === 's') {
    saveCanvas('flow-field', 'png');
  }
  if (key === 'r') {
    background(0);
    for (let p of particles) {
      p.pos = createVector(random(width), random(height));
      p.updatePrev();
    }
  }
}
