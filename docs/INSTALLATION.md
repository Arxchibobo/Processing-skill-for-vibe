# Installation Guide

## Claude Code Skill Installation

### Option 1: Global Installation (All Projects)

Copy the skill file to your global Claude Code skills directory:

**Windows:**
```powershell
# Create skills directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills"

# Copy skill file
Copy-Item "skill\processing-creative.md" "$env:USERPROFILE\.claude\skills\"
```

**macOS/Linux:**
```bash
# Create skills directory
mkdir -p ~/.claude/skills

# Copy skill file
cp skill/processing-creative.md ~/.claude/skills/
```

### Option 2: Project-Specific Installation

Copy the skill file to your project's Claude configuration:

```bash
# Create project skills directory
mkdir -p .claude/skills

# Copy skill file
cp path/to/processing-creative-skill/skill/processing-creative.md .claude/skills/
```

### Option 3: Manual Activation

You can also manually invoke the skill in Claude Code:

```
/skill processing-creative
```

Or reference it directly in conversation:
```
Use the processing-creative skill to create an animated background
```

## Processing Installation

### Windows

**Option A: Chocolatey (Recommended)**
```powershell
choco install processing
```

**Option B: Scoop**
```powershell
scoop bucket add extras
scoop install processing
```

**Option C: Manual Download**
1. Download from https://processing.org/download/
2. Extract to `C:\Program Files\Processing`
3. Add to PATH (optional):
   ```powershell
   $env:PATH += ";C:\Program Files\Processing"
   ```

### macOS

**Option A: Homebrew (Recommended)**
```bash
brew install --cask processing
```

**Option B: Manual Download**
1. Download from https://processing.org/download/
2. Drag to `/Applications`
3. Add CLI to PATH:
   ```bash
   echo 'export PATH="$PATH:/Applications/Processing.app/Contents/MacOS"' >> ~/.zshrc
   ```

### Linux

**Manual Installation:**
```bash
# Download
wget https://github.com/processing/processing4/releases/latest/download/processing-4.3-linux-x64.tgz

# Extract
tar -xzf processing-4.3-linux-x64.tgz
cd processing-4.3

# Install
./install.sh

# The CLI is added to PATH automatically
```

## FFmpeg Installation (For Video Export)

### Windows
```powershell
# Chocolatey
choco install ffmpeg

# Or Scoop
scoop install ffmpeg
```

### macOS
```bash
brew install ffmpeg
```

### Linux
```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg
```

## Verify Installation

Run the setup script to verify everything is installed:

```bash
npm run setup
```

This will:
1. Check for Processing installation
2. Check for FFmpeg installation
3. Create configuration file
4. Create output directories

## Configuration

After installation, a `config.json` file is created:

```json
{
  "processingPath": "C:\\Program Files\\Processing\\processing-java.exe",
  "outputDir": "./output",
  "framesDir": "./frames",
  "defaultFPS": 30,
  "defaultQuality": "high"
}
```

Edit this file to customize paths and settings.

## Troubleshooting

### "Processing not found"

1. Verify Processing is installed
2. Check the path in `config.json`
3. Ensure `processing-java.exe` (or `processing-java`) is in the Processing directory

### "FFmpeg not found"

FFmpeg is only required for video export. If you don't need video export:
- The skill will still work for PNG/GIF exports
- p5.js web features work without FFmpeg

### Skill Not Activating

1. Verify the skill file is in the correct location
2. Check file permissions
3. Restart Claude Code
4. Try manual invocation: `/skill processing-creative`

### Permission Errors on Scripts

**Unix:**
```bash
chmod +x scripts/*.sh
```

**Windows PowerShell:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Development Server

For testing templates locally:

```bash
npm run dev
```

This starts a live-server on http://localhost:3000 with auto-reload.

## Uninstallation

### Remove Global Skill
```bash
# Windows
del "%USERPROFILE%\.claude\skills\processing-creative.md"

# macOS/Linux
rm ~/.claude/skills/processing-creative.md
```

### Remove Project Skill
```bash
rm .claude/skills/processing-creative.md
```
