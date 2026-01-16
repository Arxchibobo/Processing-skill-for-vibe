---
name: processing-creative
description: Generate creative graphics, animations, and generative art using Processing/p5.js. Use for frontend design backgrounds, data visualizations, animated components, PPT graphics, and artistic code generation. Triggers: "processing", "p5.js", "generative art", "creative coding", "animated background", "particle system", "visual design code"
---

# Processing Creative Coding Skill

You are an expert in Processing (Java) and p5.js (JavaScript) creative coding. Generate beautiful, performant visual designs for web pages, presentations, and applications.

## Core Capabilities

### 1. Web Integration (p5.js)
Generate p5.js code for direct HTML embedding:
- Animated backgrounds for landing pages
- Interactive data visualizations
- Particle systems and motion graphics
- Responsive canvas components
- Export-ready GIFs and PNGs

### 2. Desktop Processing (Java)
Generate Processing sketches for:
- High-resolution print graphics
- Complex 3D visualizations
- Video/frame sequence export
- Standalone applications

### 3. Design Patterns Library
Built-in generative patterns:
- **Geometric**: Grids, tessellations, fractals
- **Organic**: Flow fields, Perlin noise, flocking
- **Data-driven**: Bar/line/pie charts, network graphs
- **Motion**: Easing, springs, physics simulations

---

## Output Modes

### Mode 1: p5.js Web Component (Default)
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<script>
// Your p5.js code here
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  // Animation loop
}
</script>
</body>
</html>
```

### Mode 2: Processing Java Sketch
```java
// Save as sketch_name.pde
void setup() {
  size(1920, 1080);
}
void draw() {
  // Animation loop
}
```

### Mode 3: React/Vue Component
```jsx
// p5.js with React wrapper
import Sketch from 'react-p5';

export default function MySketch() {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef);
  };
  const draw = (p5) => {
    // Animation
  };
  return <Sketch setup={setup} draw={draw} />;
}
```

---

## Pattern Library

### 1. Particle Systems
```javascript
// p5.js Particle System
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 25); // Trail effect

  // Add new particles
  if (frameCount % 2 === 0) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Update and display
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(2, 5));
    this.acc = createVector(0, 0.1);
    this.lifespan = 255;
    this.size = random(5, 15);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 4;
  }

  display() {
    noStroke();
    fill(255, 100, 150, this.lifespan);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}
```

### 2. Flow Field / Perlin Noise
```javascript
// p5.js Flow Field
let cols, rows;
let scl = 20;
let inc = 0.1;
let zoff = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  background(0);
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);

      stroke(255, 50);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();

      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.01;
}
```

### 3. Geometric Grid Patterns
```javascript
// p5.js Animated Grid
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(20);

  let gridSize = 50;
  for (let x = gridSize/2; x < width; x += gridSize) {
    for (let y = gridSize/2; y < height; y += gridSize) {
      let d = dist(mouseX, mouseY, x, y);
      let size = map(d, 0, 300, gridSize * 0.9, gridSize * 0.2);
      let rotation = map(d, 0, 300, PI/4, 0);

      push();
      translate(x, y);
      rotate(rotation);
      noFill();
      stroke(100, 200, 255);
      strokeWeight(2);
      rect(0, 0, size, size);
      pop();
    }
  }
}
```

### 4. Wave Animation
```javascript
// p5.js Sine Wave Animation
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  noFill();
  strokeWeight(2);

  for (let j = 0; j < 5; j++) {
    stroke(lerpColor(color(0, 150, 255), color(255, 50, 150), j/5));
    beginShape();
    for (let x = 0; x <= width; x += 5) {
      let y = height/2 +
              sin(x * 0.01 + frameCount * 0.02 + j * 0.5) * 100 +
              sin(x * 0.02 + frameCount * 0.03) * 50;
      vertex(x, y);
    }
    endShape();
  }
}
```

### 5. Gradient Background
```javascript
// p5.js Animated Gradient
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  // Animated gradient
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c1 = color(
      127 + sin(frameCount * 0.01) * 127,
      127 + sin(frameCount * 0.01 + 2) * 127,
      200
    );
    let c2 = color(
      127 + cos(frameCount * 0.01) * 127,
      100,
      127 + cos(frameCount * 0.01 + 2) * 127
    );
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}
```

---

## Export Options

### From p5.js (Web)
```javascript
// Save PNG
function keyPressed() {
  if (key === 's') {
    saveCanvas('myDesign', 'png');
  }
}

// Save GIF (requires p5.js-gif library)
function setup() {
  createCanvas(400, 400);
  saveGif('myAnimation', 5); // 5 second GIF
}

// Save frame sequence
let frameNum = 0;
function draw() {
  // ... drawing code
  saveCanvas('frame-' + nf(frameNum, 4), 'png');
  frameNum++;
  if (frameNum > 300) noLoop();
}
```

### From Processing Java
```java
// Save high-res PNG
void keyPressed() {
  if (key == 's') {
    save("output/design-" + frameCount + ".png");
  }
}

// Save frame sequence for video
void draw() {
  // ... drawing code
  saveFrame("frames/frame-####.png");
  if (frameCount > 300) exit();
}

// Use ffmpeg to convert frames to video:
// ffmpeg -r 60 -i frames/frame-%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4
```

---

## Integration Examples

### 1. Landing Page Hero Background
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; overflow: hidden; }
    #hero {
      position: relative;
      height: 100vh;
    }
    #p5-canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    .hero-content {
      position: relative;
      z-index: 1;
      color: white;
      text-align: center;
      padding-top: 40vh;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
<div id="hero">
  <div id="p5-canvas"></div>
  <div class="hero-content">
    <h1>Welcome</h1>
    <p>Your animated background here</p>
  </div>
</div>
<script>
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('p5-canvas');
}

function draw() {
  background(20, 20, 40);
  // Add your animation here
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
</script>
</body>
</html>
```

### 2. Data Visualization Component
```javascript
// p5.js Bar Chart with Animation
let data = [65, 59, 80, 81, 56, 55, 40];
let labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let animProgress = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);

  let barWidth = width / (data.length * 2);
  let maxVal = max(data);

  animProgress = min(animProgress + 0.02, 1);

  for (let i = 0; i < data.length; i++) {
    let x = map(i, 0, data.length - 1, barWidth, width - barWidth * 2);
    let h = map(data[i], 0, maxVal, 0, height * 0.7) * easeOutQuart(animProgress);

    // Gradient bar
    let c = lerpColor(color(100, 150, 255), color(255, 100, 150), data[i] / maxVal);
    fill(c);
    noStroke();
    rect(x, height - 50 - h, barWidth, h, 5);

    // Label
    fill(50);
    textAlign(CENTER);
    text(labels[i], x + barWidth/2, height - 30);
    text(floor(data[i] * easeOutQuart(animProgress)), x + barWidth/2, height - 55 - h);
  }
}

function easeOutQuart(x) {
  return 1 - pow(1 - x, 4);
}
```

---

## Automation Commands

### Run Processing Sketch (Windows)
```bash
# Run sketch and export
"C:\Program Files\Processing\processing-java" --sketch="path/to/sketch" --run

# Export as application
"C:\Program Files\Processing\processing-java" --sketch="path/to/sketch" --export
```

### Batch Export Script
```bash
#!/bin/bash
# export-frames.sh
SKETCH_PATH=$1
OUTPUT_DIR=$2

processing-java --sketch="$SKETCH_PATH" --run
# Processing saves frames to sketch/frames/ directory

# Convert to GIF
ffmpeg -r 30 -i "$SKETCH_PATH/frames/frame-%04d.png" -vf "scale=800:-1" "$OUTPUT_DIR/animation.gif"

# Convert to MP4
ffmpeg -r 60 -i "$SKETCH_PATH/frames/frame-%04d.png" -c:v libx264 -pix_fmt yuv420p "$OUTPUT_DIR/animation.mp4"
```

---

## Quick Reference

### Color Palettes (Generative Art Style)
```javascript
// Palette 1: Neon Night
const NEON = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'];

// Palette 2: Soft Pastel
const PASTEL = ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'];

// Palette 3: Dark Tech
const TECH = ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'];

// Palette 4: Nature
const NATURE = ['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'];

// Usage
fill(random(NEON));
```

### Performance Tips
1. Use `noStroke()` when fills are sufficient
2. Batch similar draw calls together
3. Use `frameRate(30)` for complex scenes
4. Offscreen buffers with `createGraphics()`
5. `noLoop()` for static images

### Math Utilities
```javascript
// Smooth interpolation
let smoothX = lerp(smoothX, targetX, 0.1);

// Constrain values
let safeX = constrain(x, 0, width);

// Map range
let y = map(mouseX, 0, width, 0, 100);

// Distance
let d = dist(x1, y1, x2, y2);

// Noise (Perlin)
let n = noise(x * 0.01, y * 0.01);
```

---

## Expert Artists Reference

Follow these Processing masters for inspiration:
- **@yuruyurau** (X/Twitter) - Geometric patterns, minimalist animations
- **@KomaTebe** (X/Twitter) - Complex generative systems, algorithmic art

Study their work for:
- Color palette selection
- Timing and easing curves
- Layering techniques
- Noise application patterns

---

## Workflow Integration

### For Frontend Development
1. Generate p5.js background → Test in browser → Integrate with React/Vue
2. Export static PNG/SVG → Use as CSS background-image
3. Create animated GIF → Use for loading states

### For Presentations
1. Generate high-res PNG sequences
2. Export as animated GIF for slides
3. Create looping video backgrounds

### For Data Visualization
1. Input data array → Generate chart code
2. Add animation and interactivity
3. Export or embed directly

---

## Invocation Examples

**User:** "Create an animated particle background for my landing page"
**Action:** Generate p5.js particle system with HTML integration

**User:** "Design a data visualization for weekly sales"
**Action:** Generate animated bar/line chart with your data

**User:** "Make a generative art piece with Perlin noise"
**Action:** Generate flow field or noise-based organic pattern

**User:** "Create a loading animation"
**Action:** Generate minimal geometric animation, export as GIF
