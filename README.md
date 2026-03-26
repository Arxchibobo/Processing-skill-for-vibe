# Processing Creative Skill for Claude Code

**Generate stunning graphics, animations, and generative art using Processing/p5.js — directly from Claude Code.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green)](https://nodejs.org/)
[![p5.js](https://img.shields.io/badge/p5.js-1.9.4-ED225D)](https://p5js.org/)
[![Processing](https://img.shields.io/badge/Processing-4.x-006699)](https://processing.org/)

## Overview

This is a Claude Code skill that brings creative coding into your AI-assisted workflow. Install it once, then describe what you want — particle systems, flow fields, data visualizations, animated backgrounds — and Claude generates ready-to-run Processing or p5.js code.

It includes:
- A Claude Code skill definition that activates on creative coding keywords
- A reusable pattern library (6 modules covering common generative art patterns)
- Framework integration templates for React, Vue, and standalone HTML
- Automation scripts to run sketches, export frames, and convert to GIF/MP4/WebM
- Example sketches in Processing (Java) ready to run

## Features

| Capability | Details |
|---|---|
| **p5.js web components** | Animated backgrounds, interactive elements, data visualizations |
| **Processing Java sketches** | High-resolution (up to 4K) graphics and frame exports |
| **Pattern library** | Flow fields, particle systems, geometric grids, waves, gradients, charts |
| **Framework templates** | React (TypeScript), Vue 3, standalone HTML |
| **Color themes** | 16 built-in palettes (Neon Night, Cyberpunk, Synthwave, Pastel, and more) |
| **Export pipeline** | PNG, GIF, MP4, WebM via FFmpeg automation scripts |
| **Cross-platform scripts** | Bash and PowerShell versions for all automation |

## Project Structure

```
Processing-skill-for-vibe/
├── skill/
│   └── processing-creative.md     # Claude Code skill definition
├── patterns/
│   ├── color-themes.js            # 16 color palettes + utilities
│   ├── flow-field.js              # Perlin noise particle flow
│   ├── geometric-grid.js          # Mouse-reactive shape grids
│   ├── gradient-backgrounds.js    # Linear, radial, mesh, aurora effects
│   ├── waves-animation.js         # Sine waves, ripples, waveforms
│   └── data-visualization.js     # Bar, line, pie, donut charts
├── templates/
│   ├── landing-page-hero.html     # Full page with animated background
│   ├── pattern-showcase.html      # Interactive demo of all 5 patterns
│   ├── react-p5-component.tsx     # TypeScript React component
│   └── vue-p5-component.vue       # Vue 3 composition API component
├── examples/
│   ├── flowfield/flowfield.pde    # High-res flow field (1920×1080)
│   └── particles/particles.pde   # Particle system with gravity/physics
├── scripts/
│   ├── run-sketch.sh              # Run Processing sketches (Bash)
│   ├── run-sketch.ps1             # Run Processing sketches (PowerShell)
│   ├── convert-frames.sh          # Export frames → GIF/MP4/WebM
│   └── install-processing.js     # Installation helper
├── docs/
│   ├── COMMANDS.md                # Full command reference
│   └── INSTALLATION.md           # Detailed setup guide
└── package.json
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Arxchibobo/Processing-skill-for-vibe.git
cd Processing-skill-for-vibe
npm install
npm run setup
```

### 2. Install the Claude Code skill

```bash
# Install globally (available in all projects)
cp skill/processing-creative.md ~/.claude/skills/

# Or install per-project
cp skill/processing-creative.md .claude/skills/
```

### 3. Install Processing (optional — for Java sketch features)

**Windows:**
```bash
choco install processing
# or download from https://processing.org/download/
```

**macOS:**
```bash
brew install --cask processing
```

**Linux:**
```bash
# Download from https://processing.org/download/
tar -xzf processing-*.tgz && cd processing-* && ./install.sh
```

### 4. Install FFmpeg (optional — for video export)

Required only for converting frame sequences to GIF/MP4/WebM. See `docs/INSTALLATION.md` for platform-specific instructions.

## Usage

### Activating the skill

The skill auto-activates in Claude Code when your prompt includes keywords like:
- `processing`, `p5.js`, `generative art`
- `animated background`, `particle system`
- `creative coding`, `visual design code`

### Example prompts

```
"Create an animated particle background for my landing page"

"Generate a flow field visualization with Perlin noise"

"Design an animated bar chart for this data: [65, 59, 80, 81, 56]"

"Make a geometric grid animation that responds to mouse movement"

"Build a gradient background with an aurora effect"

"Create a loading animation and export it as a GIF"
```

### Framework integration

**HTML (standalone):**
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js"></script>
</head>
<body>
  <div id="hero">
    <div id="p5-canvas"></div>
    <div class="hero-content"><h1>Welcome</h1></div>
  </div>
  <script src="patterns/flow-field.js"></script>
</body>
</html>
```

**React (TypeScript):**
```tsx
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

**Vue 3:**
```vue
<template>
  <ParticleBackground :particle-count="100" />
</template>

<script setup>
import ParticleBackground from './templates/vue-p5-component.vue';
</script>
```

## Scripts

### Run a Processing sketch

**Bash:**
```bash
./scripts/run-sketch.sh path/to/sketch           # Run
./scripts/run-sketch.sh path/to/sketch --export  # Run + export frames
./scripts/run-sketch.sh path/to/sketch --present # Fullscreen presentation mode
```

**PowerShell:**
```powershell
.\scripts\run-sketch.ps1 -SketchPath "path\to\sketch"
.\scripts\run-sketch.ps1 -SketchPath "path\to\sketch" -Export
.\scripts\run-sketch.ps1 -SketchPath "path\to\sketch" -Present
```

### Convert frame sequences to video

```bash
./scripts/convert-frames.sh frames/ output --gif          # GIF
./scripts/convert-frames.sh frames/ output --mp4          # MP4
./scripts/convert-frames.sh frames/ output --all          # All formats
./scripts/convert-frames.sh frames/ output --fps 60 --scale 1920:-1
```

### NPM scripts

```bash
npm run dev      # Start live-server for p5.js development
npm run setup    # Check Processing/FFmpeg installation
```

## Export Options

**PNG from p5.js:**
```javascript
function keyPressed() {
  if (key === 's') saveCanvas('design', 'png');
}
```

**GIF from p5.js:**
```javascript
function setup() {
  createCanvas(400, 400);
  saveGif('animation', 5); // 5 seconds
}
```

**Frame sequence (for high-quality video export):**
```javascript
function draw() {
  // drawing code...
  if (frameCount <= 300) saveCanvas('frame-' + nf(frameCount, 4), 'png');
}
```

**Convert frames to video:**
```bash
./scripts/convert-frames.sh ./frames output --mp4 --fps 60
# or manually:
ffmpeg -r 60 -i frames/frame-%04d.png -c:v libx264 output.mp4
```

## Color Palettes

16 built-in palettes are available in `patterns/color-themes.js`:

```javascript
// Neon Night
const NEON = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'];

// Soft Pastel
const PASTEL = ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'];

// Dark Tech
const TECH = ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'];

// Forest
const NATURE = ['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'];
```

Other palettes: Cyberpunk, Synthwave, Tropical, Dreamy Pink, Mint Fresh, Lavender Mist, Midnight, Deep Ocean, Sunset, Ocean, Autumn, Grayscale, Blue/Red Monochrome.

## Dependencies

**Required:**
- Node.js >= 18

**Optional:**
- Processing 4.x — for `.pde` Java sketch features
- FFmpeg — for converting frame sequences to GIF/MP4/WebM

**NPM packages:**
- `p5` ^1.9.4
- `live-server` (dev)
- `puppeteer` (dev)

## Resources

- [Processing Reference](https://processing.org/reference/)
- [p5.js Reference](https://p5js.org/reference/)
- [p5.js Web Editor](https://editor.p5js.org/)
- [The Coding Train](https://thecodingtrain.com/) — tutorials by Daniel Shiffman

## License

MIT License — free to use, modify, and distribute.

---

Made by [Bobo Zhou (Arxchibobo)](https://github.com/Arxchibobo)
