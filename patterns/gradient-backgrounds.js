/**
 * Animated Gradient Backgrounds
 * Smooth color transitions and mesh gradients
 *
 * Great for: Hero sections, app backgrounds, loading screens
 */

// ============================================
// LINEAR ANIMATED GRADIENT
// ============================================

const linearGradientConfig = {
  colors: [
    [255, 0, 110],   // Pink
    [131, 56, 236],  // Purple
    [58, 134, 255]   // Blue
  ],
  speed: 0.005,
  angle: 0 // 0 = vertical, PI/2 = horizontal
};

function drawAnimatedLinearGradient(p5, config = linearGradientConfig) {
  const { colors, speed, angle } = config;

  p5.push();
  p5.translate(p5.width / 2, p5.height / 2);
  p5.rotate(angle);
  p5.translate(-p5.width / 2, -p5.height / 2);

  const time = p5.frameCount * speed;

  for (let y = 0; y < p5.height; y++) {
    // Animated position in gradient
    let t = (y / p5.height + time) % 1;

    // Smooth color interpolation between multiple colors
    const numColors = colors.length;
    const segment = t * (numColors - 1);
    const idx1 = Math.floor(segment);
    const idx2 = Math.min(idx1 + 1, numColors - 1);
    const localT = segment - idx1;

    const r = p5.lerp(colors[idx1][0], colors[idx2][0], localT);
    const g = p5.lerp(colors[idx1][1], colors[idx2][1], localT);
    const b = p5.lerp(colors[idx1][2], colors[idx2][2], localT);

    p5.stroke(r, g, b);
    p5.line(0, y, p5.width, y);
  }

  p5.pop();
}

// ============================================
// RADIAL ANIMATED GRADIENT
// ============================================

const radialGradientConfig = {
  innerColor: [255, 100, 150],
  outerColor: [20, 20, 40],
  pulseSpeed: 0.02,
  pulseAmount: 0.2
};

function drawAnimatedRadialGradient(p5, config = radialGradientConfig) {
  const { innerColor, outerColor, pulseSpeed, pulseAmount } = config;

  const centerX = p5.width / 2;
  const centerY = p5.height / 2;
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

  // Pulse effect
  const pulse = 1 + Math.sin(p5.frameCount * pulseSpeed) * pulseAmount;

  p5.noStroke();

  for (let r = maxRadius; r > 0; r -= 2) {
    const t = (r / maxRadius) * pulse;
    const clampedT = Math.min(Math.max(t, 0), 1);

    const col = p5.lerpColor(
      p5.color(innerColor[0], innerColor[1], innerColor[2]),
      p5.color(outerColor[0], outerColor[1], outerColor[2]),
      clampedT
    );

    p5.fill(col);
    p5.ellipse(centerX, centerY, r * 2);
  }
}

// ============================================
// MESH GRADIENT (MULTI-POINT)
// ============================================

const meshGradientConfig = {
  points: [
    { x: 0.2, y: 0.2, color: [255, 0, 110] },
    { x: 0.8, y: 0.3, color: [131, 56, 236] },
    { x: 0.5, y: 0.8, color: [58, 134, 255] },
    { x: 0.1, y: 0.7, color: [6, 214, 160] }
  ],
  movementSpeed: 0.01,
  movementRadius: 0.1
};

function drawMeshGradient(p5, config = meshGradientConfig) {
  const { points, movementSpeed, movementRadius } = config;

  p5.loadPixels();

  // Animate point positions
  const animatedPoints = points.map((pt, i) => ({
    x: (pt.x + Math.sin(p5.frameCount * movementSpeed + i) * movementRadius) * p5.width,
    y: (pt.y + Math.cos(p5.frameCount * movementSpeed + i * 1.5) * movementRadius) * p5.height,
    color: pt.color
  }));

  for (let y = 0; y < p5.height; y++) {
    for (let x = 0; x < p5.width; x++) {
      // Calculate weighted average based on distance to each point
      let totalWeight = 0;
      let r = 0, g = 0, b = 0;

      for (const pt of animatedPoints) {
        const d = Math.sqrt((x - pt.x) ** 2 + (y - pt.y) ** 2);
        const weight = 1 / (d * d + 1); // Inverse square falloff

        r += pt.color[0] * weight;
        g += pt.color[1] * weight;
        b += pt.color[2] * weight;
        totalWeight += weight;
      }

      r /= totalWeight;
      g /= totalWeight;
      b /= totalWeight;

      const idx = (y * p5.width + x) * 4;
      p5.pixels[idx] = r;
      p5.pixels[idx + 1] = g;
      p5.pixels[idx + 2] = b;
      p5.pixels[idx + 3] = 255;
    }
  }

  p5.updatePixels();
}

// ============================================
// AURORA / NORTHERN LIGHTS EFFECT
// ============================================

const auroraConfig = {
  bands: 5,
  colors: ['#00ff87', '#60efff', '#00ff87', '#ff61d2', '#60efff'],
  noiseScale: 0.003,
  speed: 0.005
};

function drawAurora(p5, config = auroraConfig) {
  const { bands, colors, noiseScale, speed } = config;

  for (let band = 0; band < bands; band++) {
    const yBase = p5.map(band, 0, bands - 1, p5.height * 0.2, p5.height * 0.6);
    const col = p5.color(colors[band % colors.length]);
    col.setAlpha(80);

    p5.noStroke();
    p5.fill(col);

    p5.beginShape();
    p5.vertex(0, p5.height);

    for (let x = 0; x <= p5.width; x += 5) {
      const noiseVal = p5.noise(
        x * noiseScale,
        band * 0.5,
        p5.frameCount * speed
      );
      const y = yBase + noiseVal * 200 - 100;
      p5.vertex(x, y);
    }

    p5.vertex(p5.width, p5.height);
    p5.endShape(p5.CLOSE);
  }
}

// ============================================
// CONIC GRADIENT (PIE STYLE)
// ============================================

const conicGradientConfig = {
  colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
  rotationSpeed: 0.01
};

function drawConicGradient(p5, config = conicGradientConfig) {
  const { colors, rotationSpeed } = config;

  const centerX = p5.width / 2;
  const centerY = p5.height / 2;
  const radius = Math.max(p5.width, p5.height);

  p5.noStroke();

  const rotation = p5.frameCount * rotationSpeed;
  const numSegments = 360;

  for (let i = 0; i < numSegments; i++) {
    const angle1 = (i / numSegments) * p5.TWO_PI + rotation;
    const angle2 = ((i + 1) / numSegments) * p5.TWO_PI + rotation;

    // Color interpolation
    const t = i / numSegments;
    const segment = t * (colors.length - 1);
    const idx1 = Math.floor(segment) % colors.length;
    const idx2 = (idx1 + 1) % colors.length;
    const localT = segment - Math.floor(segment);

    const col = p5.lerpColor(p5.color(colors[idx1]), p5.color(colors[idx2]), localT);
    p5.fill(col);

    p5.triangle(
      centerX, centerY,
      centerX + Math.cos(angle1) * radius, centerY + Math.sin(angle1) * radius,
      centerX + Math.cos(angle2) * radius, centerY + Math.sin(angle2) * radius
    );
  }
}

// ============================================
// STANDALONE EXAMPLE
// ============================================

/*
let mode = 'linear'; // 'linear', 'radial', 'mesh', 'aurora', 'conic'

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // For mesh gradient performance
}

function draw() {
  switch (mode) {
    case 'linear':
      drawAnimatedLinearGradient(window);
      break;
    case 'radial':
      drawAnimatedRadialGradient(window);
      break;
    case 'mesh':
      drawMeshGradient(window);
      break;
    case 'aurora':
      background(10, 10, 30);
      drawAurora(window);
      break;
    case 'conic':
      drawConicGradient(window);
      break;
  }
}

function keyPressed() {
  if (key === '1') mode = 'linear';
  if (key === '2') mode = 'radial';
  if (key === '3') mode = 'mesh';
  if (key === '4') mode = 'aurora';
  if (key === '5') mode = 'conic';
  if (key === 's') saveCanvas('gradient', 'png');
}
*/
