/**
 * Particle System Example
 * Processing Java version
 *
 * Press 's' to save frame
 * Press 'r' to reset
 * Press 'g' to toggle gravity
 */

ArrayList<Particle> particles;
boolean gravity = true;
color[] palette = {
  #FF006E, #FB5607, #FFBE0B, #8338EC, #3A86FF
};

void setup() {
  size(1920, 1080);
  particles = new ArrayList<Particle>();
}

void draw() {
  background(20, 20, 30, 25);

  // Add new particles at mouse position
  if (mousePressed || frameCount % 3 == 0) {
    float x = mousePressed ? mouseX : random(width);
    float y = mousePressed ? mouseY : 0;
    particles.add(new Particle(x, y));
  }

  // Update and display particles
  for (int i = particles.size() - 1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.display();

    // Connect nearby particles
    for (int j = i - 1; j >= 0; j--) {
      Particle other = particles.get(j);
      float d = dist(p.pos.x, p.pos.y, other.pos.x, other.pos.y);
      if (d < 100) {
        stroke(255, map(d, 0, 100, 100, 0));
        strokeWeight(0.5);
        line(p.pos.x, p.pos.y, other.pos.x, other.pos.y);
      }
    }

    // Remove dead particles
    if (p.isDead()) {
      particles.remove(i);
    }
  }

  // Display info
  fill(255);
  noStroke();
  textSize(14);
  text("Particles: " + particles.size(), 20, 30);
  text("FPS: " + int(frameRate), 20, 50);
  text("Press 's' to save, 'r' to reset, 'g' to toggle gravity", 20, 70);
}

void keyPressed() {
  if (key == 's') {
    saveFrame("output/particles-####.png");
    println("Frame saved!");
  }
  if (key == 'r') {
    particles.clear();
  }
  if (key == 'g') {
    gravity = !gravity;
  }
}

class Particle {
  PVector pos;
  PVector vel;
  PVector acc;
  float lifespan;
  float size;
  color col;

  Particle(float x, float y) {
    pos = new PVector(x, y);
    vel = PVector.random2D();
    vel.mult(random(2, 6));
    acc = new PVector(0, 0);
    lifespan = 255;
    size = random(5, 15);
    col = palette[int(random(palette.length))];
  }

  void update() {
    if (gravity) {
      acc.y = 0.1;
    } else {
      acc.y = 0;
    }

    vel.add(acc);
    vel.mult(0.99); // Friction
    pos.add(vel);
    lifespan -= 2;

    // Bounce off edges
    if (pos.x < 0 || pos.x > width) {
      vel.x *= -0.8;
      pos.x = constrain(pos.x, 0, width);
    }
    if (pos.y > height) {
      vel.y *= -0.8;
      pos.y = height;
    }
  }

  void display() {
    noStroke();
    fill(col, lifespan);
    ellipse(pos.x, pos.y, size, size);

    // Glow effect
    fill(col, lifespan * 0.3);
    ellipse(pos.x, pos.y, size * 2, size * 2);
  }

  boolean isDead() {
    return lifespan < 0;
  }
}
