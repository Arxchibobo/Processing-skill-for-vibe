#!/bin/bash
# Processing Sketch Runner - Bash (for Git Bash on Windows / Linux / macOS)
# Usage: ./run-sketch.sh <sketch_path> [--export|--present] [--frames]

set -e

# Default Processing paths
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash)
    PROCESSING_PATH="/c/Program Files/Processing/processing-java.exe"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    PROCESSING_PATH="/Applications/Processing.app/Contents/MacOS/processing-java"
else
    # Linux
    PROCESSING_PATH="processing-java"
fi

# Parse arguments
SKETCH_PATH=""
MODE="--run"
SAVE_FRAMES=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --export)
            MODE="--export"
            shift
            ;;
        --present)
            MODE="--present"
            shift
            ;;
        --frames)
            SAVE_FRAMES=true
            shift
            ;;
        --processing-path)
            PROCESSING_PATH="$2"
            shift 2
            ;;
        *)
            SKETCH_PATH="$1"
            shift
            ;;
    esac
done

# Validate
if [[ -z "$SKETCH_PATH" ]]; then
    echo "Usage: $0 <sketch_path> [--export|--present] [--frames]"
    echo ""
    echo "Options:"
    echo "  --export          Export as standalone application"
    echo "  --present         Run in fullscreen presentation mode"
    echo "  --frames          Create frames directory for saving"
    echo "  --processing-path Specify custom Processing path"
    exit 1
fi

if [[ ! -d "$SKETCH_PATH" ]]; then
    echo "Error: Sketch directory not found: $SKETCH_PATH"
    exit 1
fi

# Convert to absolute path
SKETCH_PATH=$(cd "$SKETCH_PATH" && pwd)

echo "Processing Sketch Runner"
echo "========================"
echo "Sketch: $SKETCH_PATH"
echo "Mode: $MODE"

# Create frames directory if needed
if [[ "$SAVE_FRAMES" == true ]]; then
    mkdir -p "$SKETCH_PATH/frames"
    echo "Frames directory: $SKETCH_PATH/frames"
fi

# Run Processing
echo ""
echo "Starting Processing..."
"$PROCESSING_PATH" --sketch="$SKETCH_PATH" $MODE

echo ""
echo "Processing finished."
