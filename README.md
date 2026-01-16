# Processing Creative Skill for Claude Code

🎨 **Generate stunning graphics, animations, and generative art using Processing/p5.js directly from Claude Code.**

Transform your frontend design, presentations, and web applications with creative coding capabilities.

## Features

- **p5.js Web Integration** - Generate animated backgrounds, data visualizations, and interactive elements for web
- **Processing Java Sketches** - Create high-resolution graphics and video exports
- **Pattern Library** - Ready-to-use generative art patterns (flow fields, particles, geometric grids)
- **React/Vue Components** - Drop-in components for modern frameworks
- **Automation Scripts** - Run sketches, export frames, convert to GIF/MP4

## Quick Start

### Installation

```bash
# Clone or copy the skill folder
git clone https://github.com/yourusername/processing-creative-skill.git

# Navigate to project
cd processing-creative-skill

# Install dependencies
npm install

# Run setup (checks Processing installation)
npm run setup
```

### Install Processing (Optional, for Java features)

**Windows:**
```bash
choco install processing
# OR download from https://processing.org/download/
```

**macOS:**
```bash
brew install --cask processing
```

**Linux:**
```bash
# Download from https://processing.org/download/
tar -xzf processing-*.tgz
cd processing-* && ./install.sh
```

### For Claude Code Integration

Copy the skill file to your Claude Code skills directory:

```bash
# Windows
cp skill/processing-creative.md ~/.claude/skills/

# Or add to your project's .claude/skills/ folder
```

## Usage

### Invoke the Skill

In Claude Code, the skill auto-activates when you mention:
- "processing", "p5.js", "generative art"
- "animated background", "particle system"
- "creative coding", "visual design code"

### Example Prompts

```
"Create an animated particle background for my landing page"

"Generate a flow field visualization with Perlin noise"

"Design a data visualization for this sales data: [65, 59, 80, 81, 56]"

"Make a geometric grid animation that responds to mouse movement"

"Create a loading animation as a GIF"
```

## Project Structure

```
processing-creative-skill/
├── skill/
│   └── processing-creative.md    # Claude Code skill definition
├── scripts/
│   ├── run-sketch.ps1            # Run Processing sketches (Windows)
│   ├── run-sketch.sh             # Run Processing sketches (Unix)
│   ├── convert-frames.sh         # Convert frames to GIF/MP4
│   └── install-processing.js     # Installation helper
├── templates/
│   ├── landing-page-hero.html    # Full landing page with animated bg
│   └── react-p5-component.tsx    # React component template
├── patterns/
│   ├── flow-field.js             # Perlin noise flow field
│   ├── geometric-grid.js         # Interactive geometric grid
│   └── data-visualization.js     # Charts and graphs
├── examples/                      # Example sketches
├── docs/                          # Additional documentation
├── package.json
└── README.md
```

## Pattern Library

### 1. Particle Systems
Interactive particles with connections, trails, and physics.

```javascript
// Usage in p5.js
// See patterns/particles.js
```

### 2. Flow Fields
Organic flowing lines using Perlin noise.

```javascript
// Usage in p5.js
// See patterns/flow-field.js
```

### 3. Geometric Grids
Responsive grids of shapes that react to input.

```javascript
// Usage in p5.js
// See patterns/geometric-grid.js
```

### 4. Data Visualizations
Animated bar charts, line charts, and pie charts.

```javascript
// Usage in p5.js
// See patterns/data-visualization.js
```

## Scripts

### Run a Processing Sketch

**PowerShell (Windows):**
```powershell
.\scripts\run-sketch.ps1 -SketchPath "path\to\sketch"
.\scripts\run-sketch.ps1 -SketchPath "path\to\sketch" -Export
.\scripts\run-sketch.ps1 -SketchPath "path\to\sketch" -Present
```

**Bash (Unix/Git Bash):**
```bash
./scripts/run-sketch.sh path/to/sketch
./scripts/run-sketch.sh path/to/sketch --export
./scripts/run-sketch.sh path/to/sketch --present
```

### Convert Frames to Video

```bash
# Convert to GIF
./scripts/convert-frames.sh frames/ output --gif

# Convert to MP4
./scripts/convert-frames.sh frames/ output --mp4

# Convert all formats
./scripts/convert-frames.sh frames/ output --all

# Custom options
./scripts/convert-frames.sh frames/ output --fps 60 --scale 1920:-1
```

## Integration Examples

### Landing Page Hero

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
  <div id="hero">
    <div id="p5-canvas"></div>
    <div class="hero-content">
      <h1>Welcome</h1>
    </div>
  </div>
  <script src="patterns/flow-field.js"></script>
</body>
</html>
```

### React Component

```jsx
import ParticleBackground from './templates/react-p5-component';

function App() {
  return (
    <div>
      <ParticleBackground particleCount={100} />
      <main>Your content here</main>
    </div>
  );
}
```

### Data Visualization

```javascript
// Animated bar chart
const data = [65, 59, 80, 81, 56, 55, 40];
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function draw() {
  drawBarChart(window, {
    data,
    labels,
    colors: ['#FF6384', '#36A2EB', '#FFCE56']
  });
}
```

## Export Options

### Save PNG (p5.js)
```javascript
function keyPressed() {
  if (key === 's') {
    saveCanvas('design', 'png');
  }
}
```

### Save GIF (p5.js)
```javascript
function setup() {
  createCanvas(400, 400);
  saveGif('animation', 5); // 5 seconds
}
```

### Save Frame Sequence
```javascript
function draw() {
  // ... drawing code
  if (frameCount <= 300) {
    saveCanvas('frame-' + nf(frameCount, 4), 'png');
  }
}
```

### Convert to Video
```bash
# Using the included script
./scripts/convert-frames.sh ./frames output --mp4 --fps 60

# Or manually with ffmpeg
ffmpeg -r 60 -i frames/frame-%04d.png -c:v libx264 output.mp4
```

## Color Palettes

Built-in palettes for quick use:

```javascript
// Neon Night
const NEON = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'];

// Soft Pastel
const PASTEL = ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'];

// Dark Tech
const TECH = ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'];

// Nature
const NATURE = ['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'];
```

## Dependencies

**Required:**
- Node.js >= 18

**Optional:**
- Processing 4.x (for Java features)
- FFmpeg (for video export)

**NPM Packages:**
- `p5` - p5.js library
- `live-server` - Local development server
- `puppeteer` - Headless browser for testing

## Inspiration

Follow these Processing masters for creative inspiration:
- [@yuruyurau](https://x.com/yuruyurau) - Geometric patterns, minimalist animations
- [@KomaTebe](https://x.com/KomaTebe) - Complex generative systems

## Resources

- [Processing Reference](https://processing.org/reference/)
- [p5.js Reference](https://p5js.org/reference/)
- [p5.js Editor](https://editor.p5js.org/)
- [The Coding Train](https://thecodingtrain.com/) - Tutorials

## License

MIT License - Free to use, modify, and distribute.

---

**Made with 🎨 for creative coding with Claude Code**
