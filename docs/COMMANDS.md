# Commands Reference

## Claude Code Invocation

### Trigger Keywords
The skill auto-activates when you mention:
- `processing` / `p5.js` / `p5js`
- `generative art` / `creative coding`
- `animated background` / `particle system`
- `flow field` / `perlin noise`
- `canvas animation` / `visual design code`

### Example Prompts

#### Web Backgrounds
```
Create an animated particle background for my landing page

Generate a flow field animation with blue and purple colors

Design a geometric grid pattern that responds to mouse movement
```

#### Data Visualization
```
Create an animated bar chart for this data: [65, 59, 80, 81, 56]
Labels: [Mon, Tue, Wed, Thu, Fri]

Generate a line chart comparing two series over time

Design a donut chart showing market share percentages
```

#### Exports
```
Create a loading animation and export as GIF

Generate a high-resolution 4K background image

Design an animated logo, export as video
```

#### React/Vue Integration
```
Create a p5.js React component for animated background

Generate a Vue component with particle effects
```

## Script Commands

### NPM Scripts

```bash
# Start development server (templates)
npm run dev

# Run setup/installation check
npm run setup

# Install dependencies
npm install
```

### Run Processing Sketches

**PowerShell (Windows):**
```powershell
# Basic run
.\scripts\run-sketch.ps1 -SketchPath "examples\particles"

# Run in presentation mode (fullscreen)
.\scripts\run-sketch.ps1 -SketchPath "examples\particles" -Present

# Export as application
.\scripts\run-sketch.ps1 -SketchPath "examples\particles" -Export

# Enable frame saving
.\scripts\run-sketch.ps1 -SketchPath "examples\particles" -Frames

# Custom Processing path
.\scripts\run-sketch.ps1 -SketchPath "examples\particles" -ProcessingPath "D:\Processing\processing-java.exe"
```

**Bash (Unix/Git Bash):**
```bash
# Basic run
./scripts/run-sketch.sh examples/particles

# Run in presentation mode
./scripts/run-sketch.sh examples/particles --present

# Export as application
./scripts/run-sketch.sh examples/particles --export

# Enable frame saving
./scripts/run-sketch.sh examples/particles --frames

# Custom Processing path
./scripts/run-sketch.sh examples/particles --processing-path /usr/local/bin/processing-java
```

### Convert Frames to Video

```bash
# Convert to GIF
./scripts/convert-frames.sh frames/ output --gif

# Convert to MP4
./scripts/convert-frames.sh frames/ output --mp4

# Convert to WebM
./scripts/convert-frames.sh frames/ output --webm

# Convert to all formats
./scripts/convert-frames.sh frames/ output --all

# Custom frame rate
./scripts/convert-frames.sh frames/ output --fps 60

# Custom scale (width:-1 maintains aspect ratio)
./scripts/convert-frames.sh frames/ output --scale 1920:-1

# Quality presets
./scripts/convert-frames.sh frames/ output --quality low    # faster, smaller
./scripts/convert-frames.sh frames/ output --quality medium
./scripts/convert-frames.sh frames/ output --quality high   # default

# Combined options
./scripts/convert-frames.sh frames/ output --all --fps 60 --scale 1280:-1 --quality high
```

## p5.js Keyboard Shortcuts (In Sketch)

Most patterns include these shortcuts:

| Key | Action |
|-----|--------|
| `s` | Save current frame as PNG |
| `r` | Reset/restart animation |
| `Space` | Toggle animation pause |
| `1-5` | Switch shape/mode (pattern dependent) |

## Processing Java Keyboard Shortcuts

In Processing IDE:
| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Run sketch |
| `Ctrl+Shift+R` | Present mode |
| `Ctrl+E` | Export application |
| `Ctrl+S` | Save sketch |
| `Ctrl+K` | Find in reference |

## FFmpeg Commands (Manual)

If you need more control than the scripts provide:

```bash
# PNG sequence to MP4 (high quality)
ffmpeg -r 60 -i frames/frame-%04d.png -c:v libx264 -crf 18 -pix_fmt yuv420p output.mp4

# PNG sequence to GIF (optimized)
ffmpeg -r 30 -i frames/frame-%04d.png \
  -vf "fps=30,scale=800:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer" \
  output.gif

# PNG sequence to WebM
ffmpeg -r 60 -i frames/frame-%04d.png -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm

# Single image to video (loop)
ffmpeg -loop 1 -i image.png -c:v libx264 -t 10 -pix_fmt yuv420p looped.mp4

# Add audio to video
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4

# Create thumbnail from video
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 thumbnail.png
```

## Quick Reference Card

```
┌──────────────────────────────────────────────────────────┐
│               PROCESSING CREATIVE SKILL                   │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  TRIGGER WORDS:                                           │
│    processing, p5.js, generative art, particle,           │
│    flow field, animated background, creative coding       │
│                                                           │
│  OUTPUT MODES:                                            │
│    • p5.js HTML (web)                                     │
│    • Processing .pde (desktop)                            │
│    • React/Vue component                                  │
│                                                           │
│  PATTERNS:                                                │
│    • Particles    • Flow Fields                           │
│    • Grids        • Data Viz                              │
│    • Waves        • Gradients                             │
│                                                           │
│  EXPORTS:                                                 │
│    PNG, GIF, MP4, WebM, Application                       │
│                                                           │
│  SCRIPTS:                                                 │
│    npm run dev          - Start dev server                │
│    npm run setup        - Check installation              │
│    run-sketch.ps1       - Run Processing                  │
│    convert-frames.sh    - Export video                    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```
