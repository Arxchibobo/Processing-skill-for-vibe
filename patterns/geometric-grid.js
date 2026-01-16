/**
 * Geometric Grid Pattern
 * Interactive grid of rotating/scaling shapes
 *
 * Great for: Tech backgrounds, loading screens, interactive displays
 */

const CONFIG = {
  gridSize: 60,        // Size of each grid cell
  shape: 'square',     // 'square', 'circle', 'triangle', 'hexagon'
  interaction: 'mouse', // 'mouse', 'wave', 'random'
  effectRadius: 200,   // Mouse influence radius
  baseRotation: 0,     // Base rotation in radians
  strokeColor: [100, 200, 255],
  backgroundColor: [20, 20, 30],
  animate: true
};

let angle = 0;
let waveOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(...CONFIG.backgroundColor);

  for (let x = CONFIG.gridSize / 2; x < width + CONFIG.gridSize; x += CONFIG.gridSize) {
    for (let y = CONFIG.gridSize / 2; y < height + CONFIG.gridSize; y += CONFIG.gridSize) {
      let size, rotation, alpha;

      switch (CONFIG.interaction) {
        case 'mouse':
          let d = dist(mouseX, mouseY, x, y);
          size = map(d, 0, CONFIG.effectRadius, CONFIG.gridSize * 0.9, CONFIG.gridSize * 0.2);
          size = constrain(size, CONFIG.gridSize * 0.2, CONFIG.gridSize * 0.9);
          rotation = map(d, 0, CONFIG.effectRadius, PI / 4, 0);
          alpha = map(d, 0, CONFIG.effectRadius * 1.5, 255, 100);
          break;

        case 'wave':
          let wave = sin((x + y) * 0.02 + waveOffset);
          size = map(wave, -1, 1, CONFIG.gridSize * 0.3, CONFIG.gridSize * 0.8);
          rotation = wave * PI / 4;
          alpha = map(wave, -1, 1, 100, 255);
          break;

        case 'random':
          let n = noise(x * 0.01, y * 0.01, frameCount * 0.01);
          size = map(n, 0, 1, CONFIG.gridSize * 0.2, CONFIG.gridSize * 0.9);
          rotation = n * PI / 2;
          alpha = map(n, 0, 1, 100, 255);
          break;
      }

      push();
      translate(x, y);
      rotate(rotation + CONFIG.baseRotation);

      noFill();
      stroke(CONFIG.strokeColor[0], CONFIG.strokeColor[1], CONFIG.strokeColor[2], alpha);
      strokeWeight(2);

      drawShape(size);
      pop();
    }
  }

  if (CONFIG.animate) {
    angle += 0.02;
    waveOffset += 0.05;
  }
}

function drawShape(size) {
  switch (CONFIG.shape) {
    case 'square':
      rect(0, 0, size, size);
      break;

    case 'circle':
      ellipse(0, 0, size, size);
      break;

    case 'triangle':
      let h = size * sqrt(3) / 2;
      triangle(0, -h / 2, -size / 2, h / 2, size / 2, h / 2);
      break;

    case 'hexagon':
      beginShape();
      for (let i = 0; i < 6; i++) {
        let a = (TWO_PI / 6) * i - PI / 6;
        let px = cos(a) * size / 2;
        let py = sin(a) * size / 2;
        vertex(px, py);
      }
      endShape(CLOSE);
      break;

    case 'cross':
      let arm = size / 4;
      beginShape();
      vertex(-arm, -size / 2);
      vertex(arm, -size / 2);
      vertex(arm, -arm);
      vertex(size / 2, -arm);
      vertex(size / 2, arm);
      vertex(arm, arm);
      vertex(arm, size / 2);
      vertex(-arm, size / 2);
      vertex(-arm, arm);
      vertex(-size / 2, arm);
      vertex(-size / 2, -arm);
      vertex(-arm, -arm);
      endShape(CLOSE);
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('geometric-grid', 'png');
  }
  if (key === '1') CONFIG.shape = 'square';
  if (key === '2') CONFIG.shape = 'circle';
  if (key === '3') CONFIG.shape = 'triangle';
  if (key === '4') CONFIG.shape = 'hexagon';
  if (key === '5') CONFIG.shape = 'cross';
  if (key === 'w') CONFIG.interaction = 'wave';
  if (key === 'm') CONFIG.interaction = 'mouse';
  if (key === 'r') CONFIG.interaction = 'random';
  if (key === ' ') CONFIG.animate = !CONFIG.animate;
}
