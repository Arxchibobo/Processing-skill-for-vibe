/**
 * Color Theme System
 * Pre-built color palettes for generative art
 *
 * Usage: Apply themes to any pattern
 */

const ColorThemes = {
  // ============================================
  // VIBRANT THEMES
  // ============================================

  neonNight: {
    name: 'Neon Night',
    background: '#0d0d0d',
    colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
    accent: '#FF006E'
  },

  cyberpunk: {
    name: 'Cyberpunk',
    background: '#0a0a0a',
    colors: ['#ff00ff', '#00ffff', '#ff0080', '#80ff00', '#0080ff'],
    accent: '#ff00ff'
  },

  synthwave: {
    name: 'Synthwave',
    background: '#1a0a2e',
    colors: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff', '#fffb96'],
    accent: '#ff71ce'
  },

  tropical: {
    name: 'Tropical',
    background: '#1a1a2e',
    colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
    accent: '#ff6b6b'
  },

  // ============================================
  // SOFT/PASTEL THEMES
  // ============================================

  softPastel: {
    name: 'Soft Pastel',
    background: '#faf5ff',
    colors: ['#FFB5A7', '#FCD5CE', '#F8EDEB', '#F9DCC4', '#FEC89A'],
    accent: '#FFB5A7'
  },

  dreamyPink: {
    name: 'Dreamy Pink',
    background: '#fff0f5',
    colors: ['#ffafcc', '#ffc8dd', '#cdb4db', '#a2d2ff', '#bde0fe'],
    accent: '#ffafcc'
  },

  mintFresh: {
    name: 'Mint Fresh',
    background: '#f0fff4',
    colors: ['#95d5b2', '#74c69d', '#52b788', '#40916c', '#2d6a4f'],
    accent: '#52b788'
  },

  lavenderMist: {
    name: 'Lavender Mist',
    background: '#f5f0ff',
    colors: ['#e0aaff', '#c77dff', '#9d4edd', '#7b2cbf', '#5a189a'],
    accent: '#c77dff'
  },

  // ============================================
  // DARK THEMES
  // ============================================

  darkTech: {
    name: 'Dark Tech',
    background: '#0D1B2A',
    colors: ['#1B263B', '#415A77', '#778DA9', '#E0E1DD', '#FFFFFF'],
    accent: '#778DA9'
  },

  midnight: {
    name: 'Midnight',
    background: '#0f0f23',
    colors: ['#1a1a3e', '#2d2d6e', '#4040a1', '#6666cc', '#9999ff'],
    accent: '#6666cc'
  },

  deepOcean: {
    name: 'Deep Ocean',
    background: '#0a192f',
    colors: ['#112240', '#1d3557', '#457b9d', '#a8dadc', '#f1faee'],
    accent: '#457b9d'
  },

  // ============================================
  // NATURE THEMES
  // ============================================

  forest: {
    name: 'Forest',
    background: '#1a2f1a',
    colors: ['#606C38', '#283618', '#FEFAE0', '#DDA15E', '#BC6C25'],
    accent: '#606C38'
  },

  sunset: {
    name: 'Sunset',
    background: '#1a1a2e',
    colors: ['#ff7e5f', '#feb47b', '#ffcc5c', '#ff6f61', '#c94c4c'],
    accent: '#ff7e5f'
  },

  ocean: {
    name: 'Ocean',
    background: '#001219',
    colors: ['#005f73', '#0a9396', '#94d2bd', '#e9d8a6', '#ee9b00'],
    accent: '#0a9396'
  },

  autumn: {
    name: 'Autumn',
    background: '#2d2d2d',
    colors: ['#d4a373', '#ccd5ae', '#e9edc9', '#fefae0', '#faedcd'],
    accent: '#d4a373'
  },

  // ============================================
  // MONOCHROME THEMES
  // ============================================

  grayscale: {
    name: 'Grayscale',
    background: '#1a1a1a',
    colors: ['#ffffff', '#cccccc', '#999999', '#666666', '#333333'],
    accent: '#ffffff'
  },

  blueMonochrome: {
    name: 'Blue Monochrome',
    background: '#0a1628',
    colors: ['#0d47a1', '#1565c0', '#1976d2', '#2196f3', '#64b5f6'],
    accent: '#2196f3'
  },

  redMonochrome: {
    name: 'Red Monochrome',
    background: '#1a0a0a',
    colors: ['#b71c1c', '#c62828', '#d32f2f', '#e53935', '#ef5350'],
    accent: '#e53935'
  }
};

// ============================================
// THEME UTILITIES
// ============================================

/**
 * Get a random color from a theme
 */
function getRandomColor(theme) {
  return theme.colors[Math.floor(Math.random() * theme.colors.length)];
}

/**
 * Get interpolated color between theme colors
 */
function getInterpolatedColor(p5, theme, t) {
  const colors = theme.colors;
  const segment = t * (colors.length - 1);
  const idx1 = Math.floor(segment);
  const idx2 = Math.min(idx1 + 1, colors.length - 1);
  const localT = segment - idx1;

  return p5.lerpColor(p5.color(colors[idx1]), p5.color(colors[idx2]), localT);
}

/**
 * Apply theme to p5 canvas
 */
function applyTheme(p5, theme) {
  p5.background(theme.background);
  return {
    getColor: (index) => p5.color(theme.colors[index % theme.colors.length]),
    getRandomColor: () => p5.color(getRandomColor(theme)),
    getInterpolatedColor: (t) => getInterpolatedColor(p5, theme, t),
    accent: p5.color(theme.accent),
    background: p5.color(theme.background)
  };
}

// ============================================
// GRADIENT UTILITIES
// ============================================

/**
 * Create a gradient array from theme colors
 */
function createGradient(p5, theme, steps = 100) {
  const gradient = [];
  for (let i = 0; i < steps; i++) {
    gradient.push(getInterpolatedColor(p5, theme, i / (steps - 1)));
  }
  return gradient;
}

/**
 * Draw vertical gradient background
 */
function drawGradientBackground(p5, theme) {
  p5.noStroke();
  const colors = theme.colors;
  const segmentHeight = p5.height / (colors.length - 1);

  for (let i = 0; i < colors.length - 1; i++) {
    const y1 = i * segmentHeight;
    const y2 = (i + 1) * segmentHeight;

    for (let y = y1; y < y2; y++) {
      const t = (y - y1) / segmentHeight;
      const c = p5.lerpColor(p5.color(colors[i]), p5.color(colors[i + 1]), t);
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }
  }
}

// ============================================
// EXPORT
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ColorThemes,
    getRandomColor,
    getInterpolatedColor,
    applyTheme,
    createGradient,
    drawGradientBackground
  };
}

// ============================================
// USAGE EXAMPLE
// ============================================

/*
// In your p5.js sketch:

let theme;

function setup() {
  createCanvas(800, 600);
  theme = applyTheme(window, ColorThemes.neonNight);
}

function draw() {
  background(ColorThemes.neonNight.background);

  // Use theme colors
  fill(theme.getColor(0));
  ellipse(100, 100, 50);

  fill(theme.getRandomColor());
  ellipse(200, 100, 50);

  fill(theme.getInterpolatedColor(mouseX / width));
  ellipse(300, 100, 50);

  fill(theme.accent);
  ellipse(400, 100, 50);
}

// Switch themes dynamically
function keyPressed() {
  if (key === '1') theme = applyTheme(window, ColorThemes.neonNight);
  if (key === '2') theme = applyTheme(window, ColorThemes.softPastel);
  if (key === '3') theme = applyTheme(window, ColorThemes.darkTech);
  if (key === '4') theme = applyTheme(window, ColorThemes.sunset);
}
*/
