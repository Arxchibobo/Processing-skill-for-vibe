/**
 * Flow Field Example
 * Processing Java version - High resolution output
 *
 * Press 's' to save high-res image
 * Press 'r' to reset
 * Press 'c' to change colors
 * Press 'p' to toggle pause
 */

// Configuration
int SCALE = 20;
float INC = 0.1;
int PARTICLE_COUNT = 2000;

// State
int cols, rows;
PVector[] flowfield;
ArrayList<FlowParticle> particles;
float zoff = 0;
boolean paused = false;

// Color palettes
color[][] palettes = {
  {#FF006E, #FB5607, #FFBE0B, #8338EC, #3A86FF},  // Neon
  {#00ff87, #60efff, #ff61d2, #ffcd4b, #a855f7},  // Synthwave
  {#0077b6, #00b4d8, #90e0ef, #caf0f8, #03045e},  // Ocean
  {#ff7b00, #ff8800, #ff9500, #ffa200, #ffaa00}   // Fire
};
int currentPalette = 0;

void setup() {
  size(1920, 1080, P2D);
  pixelDensity(1);

  cols = floor(width / SCALE);
  rows = floor(height / SCALE);
  flowfield = new PVector[cols * rows];

  initParticles();
  background(0);
}

void initParticles() {
  particles = new ArrayList<FlowParticle>();
  for (int i = 0; i < PARTICLE_COUNT; i++) {
    particles.add(new FlowParticle());
  }
}

void draw() {
  if (paused) return;

  // Update flow field
  float yoff = 0;
  for (int y = 0; y < rows; y++) {
    float xoff = 0;
    for (int x = 0; x < cols; x++) {
      int index = x + y * cols;
      float angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      PVector v = PVector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += INC;
    }
    yoff += INC;
  }
  zoff += 0.002;

  // Update particles
  for (FlowParticle p : particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  }

  // Info overlay
  fill(255);
  noStroke();
  textSize(14);
  text("FPS: " + int(frameRate), 20, 30);
  text("Particles: " + particles.size(), 20, 50);
  text("Palette: " + (currentPalette + 1) + "/4", 20, 70);
  text("Press 's' to save, 'r' to reset, 'c' to change colors", 20, 90);
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    saveHighRes();
  }
  if (key == 'r' || key == 'R') {
    background(0);
    initParticles();
  }
  if (key == 'c' || key == 'C') {
    currentPalette = (currentPalette + 1) % palettes.length;
    for (FlowParticle p : particles) {
      p.col = getRandomPaletteColor();
    }
  }
  if (key == 'p' || key == 'P') {
    paused = !paused;
  }
}

void saveHighRes() {
  println("Saving high-resolution image...");

  // Create high-res buffer
  PGraphics hires = createGraphics(3840, 2160, P2D);
  hires.beginDraw();
  hires.background(0);

  // Scale factor
  float sf = 2.0;

  // Redraw particles at high res
  for (FlowParticle p : particles) {
    hires.stroke(p.col, 30);
    hires.strokeWeight(1);
    hires.line(p.prevPos.x * sf, p.prevPos.y * sf,
               p.pos.x * sf, p.pos.y * sf);
  }

  hires.endDraw();
  hires.save("output/flowfield-4K-" + frameCount + ".png");
  println("Saved: output/flowfield-4K-" + frameCount + ".png");
}

color getRandomPaletteColor() {
  color[] palette = palettes[currentPalette];
  return palette[int(random(palette.length))];
}

class FlowParticle {
  PVector pos;
  PVector vel;
  PVector acc;
  PVector prevPos;
  float maxSpeed = 2;
  color col;

  FlowParticle() {
    pos = new PVector(random(width), random(height));
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    prevPos = pos.copy();
    col = getRandomPaletteColor();
  }

  void follow(PVector[] vectors) {
    int x = floor(pos.x / SCALE);
    int y = floor(pos.y / SCALE);
    int index = x + y * cols;
    if (index >= 0 && index < vectors.length) {
      PVector force = vectors[index];
      applyForce(force);
    }
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void update() {
    vel.add(acc);
    vel.limit(maxSpeed);
    pos.add(vel);
    acc.mult(0);
  }

  void show() {
    stroke(col, 30);
    strokeWeight(1);
    line(prevPos.x, prevPos.y, pos.x, pos.y);
    updatePrev();
  }

  void updatePrev() {
    prevPos.x = pos.x;
    prevPos.y = pos.y;
  }

  void edges() {
    if (pos.x > width) {
      pos.x = 0;
      updatePrev();
    }
    if (pos.x < 0) {
      pos.x = width;
      updatePrev();
    }
    if (pos.y > height) {
      pos.y = 0;
      updatePrev();
    }
    if (pos.y < 0) {
      pos.y = height;
      updatePrev();
    }
  }
}
