#!/usr/bin/env node

/**
 * Processing Installation Helper
 * Detects OS and provides installation instructions
 */

const os = require('os');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const PROCESSING_VERSION = '4.3';

const EXPECTED_PATHS = {
  win32: [
    'C:\\Program Files\\Processing\\processing-java.exe',
    'C:\\Program Files (x86)\\Processing\\processing-java.exe',
    path.join(os.homedir(), 'AppData\\Local\\Programs\\Processing\\processing-java.exe')
  ],
  darwin: [
    '/Applications/Processing.app/Contents/MacOS/processing-java'
  ],
  linux: [
    '/usr/local/bin/processing-java',
    path.join(os.homedir(), 'processing-4.3/processing-java')
  ]
};

function findProcessing() {
  const platform = os.platform();
  const paths = EXPECTED_PATHS[platform] || [];

  for (const p of paths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Try which/where command with execFileSync (safer)
  try {
    if (platform === 'win32') {
      const result = execFileSync('where', ['processing-java'], { encoding: 'utf8' });
      return result.trim().split('\n')[0];
    } else {
      const result = execFileSync('which', ['processing-java'], { encoding: 'utf8' });
      return result.trim();
    }
  } catch {
    return null;
  }
}

function getInstallInstructions() {
  const platform = os.platform();

  let instructions = '';

  switch (platform) {
    case 'win32':
      instructions = `
Processing Installation (Windows)
═════════════════════════════════

Option 1: Download from website
  1. Visit: https://processing.org/download/
  2. Download Windows 64-bit version
  3. Extract to: C:\\Program Files\\Processing

Option 2: Using Chocolatey
  choco install processing

Option 3: Using Scoop
  scoop bucket add extras
  scoop install processing
`;
      break;

    case 'darwin':
      instructions = `
Processing Installation (macOS)
═══════════════════════════════

Option 1: Download from website
  1. Visit: https://processing.org/download/
  2. Download macOS version
  3. Drag to /Applications

Option 2: Using Homebrew
  brew install --cask processing

After installation, add CLI to PATH:
  export PATH="$PATH:/Applications/Processing.app/Contents/MacOS"
`;
      break;

    case 'linux':
      instructions = `
Processing Installation (Linux)
═══════════════════════════════

Option 1: Download from website
  1. Visit: https://processing.org/download/
  2. Download Linux 64-bit version
  3. Extract and run install.sh

Option 2: Manual installation
  wget https://github.com/processing/processing4/releases/latest
  tar -xzf processing-*.tgz
  cd processing-*
  ./install.sh
`;
      break;
  }

  return instructions;
}

function checkFFmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { encoding: 'utf8', stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function main() {
  console.log('\n🎨 Processing Creative Skill - Setup\n');
  console.log('═'.repeat(50));

  // Check Processing
  console.log('\n📦 Checking Processing installation...');
  const processingPath = findProcessing();

  if (processingPath) {
    console.log(`✅ Processing found: ${processingPath}`);
  } else {
    console.log('❌ Processing not found!');
    console.log(getInstallInstructions());
  }

  // Check FFmpeg
  console.log('\n📦 Checking FFmpeg installation...');
  if (checkFFmpeg()) {
    console.log('✅ FFmpeg found');
  } else {
    console.log('❌ FFmpeg not found (optional, needed for video export)');
    console.log('   Install: choco install ffmpeg (Windows)');
    console.log('            brew install ffmpeg (macOS)');
    console.log('            sudo apt install ffmpeg (Linux)');
  }

  // Check Node modules
  console.log('\n📦 Checking Node.js dependencies...');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    console.log('   Run: npm install');
  }

  // Create config file
  console.log('\n📝 Creating configuration...');
  const config = {
    processingPath: processingPath || 'C:\\Program Files\\Processing\\processing-java.exe',
    outputDir: path.join(__dirname, '..', 'output'),
    framesDir: path.join(__dirname, '..', 'frames'),
    defaultFPS: 30,
    defaultQuality: 'high'
  };

  const configPath = path.join(__dirname, '..', 'config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`✅ Config saved to: ${configPath}`);

  // Create output directories
  fs.mkdirSync(config.outputDir, { recursive: true });
  fs.mkdirSync(config.framesDir, { recursive: true });
  console.log('✅ Output directories created');

  console.log('\n═'.repeat(50));
  console.log('🎉 Setup complete!\n');

  if (!processingPath) {
    console.log('⚠️  Please install Processing to use desktop features.');
    console.log('   p5.js web features work without Processing.\n');
  }
}

main();
