/**
 * Wave Animation Patterns
 * Smooth, flowing wave effects
 *
 * Great for: Hero backgrounds, loading states, ambient effects
 */

// ============================================
// SINE WAVE LAYERS
// ============================================

const waveConfig = {
  layers: 5,
  amplitude: 80,
  frequency: 0.02,
  speed: 0.03,
  colors: ['#FF006E', '#8338EC', '#3A86FF', '#06D6A0', '#FFD166']
};

function drawWaveLayers(p5, config = waveConfig) {
  const { layers, amplitude, frequency, speed, colors } = config;

  for (let j = 0; j < layers; j++) {
    const yOffset = p5.map(j, 0, layers - 1, p5.height * 0.3, p5.height * 0.7);
    const col = p5.color(colors[j % colors.length]);
    col.setAlpha(150);

    p5.noFill();
    p5.stroke(col);
    p5.strokeWeight(3);

    p5.beginShape();
    for (let x = 0; x <= p5.width; x += 5) {
      const y = yOffset +
        p5.sin(x * frequency + p5.frameCount * speed + j * 0.5) * amplitude +
        p5.sin(x * frequency * 2 + p5.frameCount * speed * 1.5) * (amplitude * 0.3);
      p5.vertex(x, y);
    }
    p5.endShape();
  }
}

// ============================================
// FILLED WAVE (OCEAN STYLE)
// ============================================

const oceanConfig = {
  waveCount: 3,
  baseHeight: 0.6, // 0-1, from top
  colors: ['#1a535c', '#4ecdc4', '#95e1d3']
};

function drawOceanWaves(p5, config = oceanConfig) {
  const { waveCount, baseHeight, colors } = config;

  for (let i = waveCount - 1; i >= 0; i--) {
    const yBase = p5.height * baseHeight + i * 30;

    p5.fill(colors[i % colors.length]);
    p5.noStroke();

    p5.beginShape();
    p5.vertex(0, p5.height);

    for (let x = 0; x <= p5.width; x += 10) {
      const y = yBase +
        p5.sin(x * 0.01 + p5.frameCount * 0.02 + i) * 30 +
        p5.sin(x * 0.02 + p5.frameCount * 0.03 + i * 2) * 15;
      p5.vertex(x, y);
    }

    p5.vertex(p5.width, p5.height);
    p5.endShape(p5.CLOSE);
  }
}

// ============================================
// CIRCULAR WAVES (RIPPLE EFFECT)
// ============================================

class Ripple {
  constructor(p5, x, y) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = Math.max(p5.width, p5.height);
    this.speed = 3;
    this.alpha = 255;
  }

  update() {
    this.radius += this.speed;
    this.alpha = this.p5.map(this.radius, 0, this.maxRadius, 255, 0);
  }

  display() {
    this.p5.noFill();
    this.p5.stroke(100, 200, 255, this.alpha);
    this.p5.strokeWeight(2);
    this.p5.ellipse(this.x, this.y, this.radius * 2);
  }

  isDone() {
    return this.radius > this.maxRadius;
  }
}

let ripples = [];

function drawRipples(p5) {
  // Add ripple on click
  if (p5.mouseIsPressed && p5.frameCount % 10 === 0) {
    ripples.push(new Ripple(p5, p5.mouseX, p5.mouseY));
  }

  // Auto ripples
  if (p5.frameCount % 60 === 0) {
    ripples.push(new Ripple(p5, p5.random(p5.width), p5.random(p5.height)));
  }

  // Update and display
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();
    if (ripples[i].isDone()) {
      ripples.splice(i, 1);
    }
  }
}

// ============================================
// WAVEFORM VISUALIZER (AUDIO STYLE)
// ============================================

function drawWaveformVisualizer(p5, data = null) {
  // Generate fake audio data if none provided
  if (!data) {
    data = [];
    for (let i = 0; i < 64; i++) {
      data.push(p5.noise(i * 0.1, p5.frameCount * 0.02) * 255);
    }
  }

  const barWidth = p5.width / data.length;
  const centerY = p5.height / 2;

  p5.noStroke();

  for (let i = 0; i < data.length; i++) {
    const barHeight = p5.map(data[i], 0, 255, 5, p5.height * 0.4);

    // Gradient color based on height
    const hue = p5.map(i, 0, data.length, 200, 300);
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.fill(hue, 80, 100);
    p5.colorMode(p5.RGB);

    // Mirror bars
    p5.rect(i * barWidth, centerY - barHeight / 2, barWidth - 2, barHeight, 2);
  }
}

// ============================================
// STANDALONE EXAMPLE
// ============================================

/*
let mode = 'layers'; // 'layers', 'ocean', 'ripples', 'waveform'

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20, 20, 30);

  switch (mode) {
    case 'layers':
      drawWaveLayers(window);
      break;
    case 'ocean':
      drawOceanWaves(window);
      break;
    case 'ripples':
      drawRipples(window);
      break;
    case 'waveform':
      drawWaveformVisualizer(window);
      break;
  }
}

function keyPressed() {
  if (key === '1') mode = 'layers';
  if (key === '2') mode = 'ocean';
  if (key === '3') mode = 'ripples';
  if (key === '4') mode = 'waveform';
  if (key === 's') saveCanvas('waves', 'png');
}
*/
