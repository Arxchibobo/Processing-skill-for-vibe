#!/bin/bash
# Convert Processing frame sequences to video/GIF
# Usage: ./convert-frames.sh <frames_dir> <output_name> [--gif|--mp4|--webm|--all]

set -e

FRAMES_DIR=""
OUTPUT_NAME="output"
FORMAT="all"
FPS=30
SCALE="800:-1"
QUALITY="high"

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --gif)
            FORMAT="gif"
            shift
            ;;
        --mp4)
            FORMAT="mp4"
            shift
            ;;
        --webm)
            FORMAT="webm"
            shift
            ;;
        --all)
            FORMAT="all"
            shift
            ;;
        --fps)
            FPS="$2"
            shift 2
            ;;
        --scale)
            SCALE="$2"
            shift 2
            ;;
        --quality)
            QUALITY="$2"
            shift 2
            ;;
        --help|-h)
            echo "Convert Processing frame sequences to video/GIF"
            echo ""
            echo "Usage: $0 <frames_dir> <output_name> [options]"
            echo ""
            echo "Options:"
            echo "  --gif        Output GIF only"
            echo "  --mp4        Output MP4 only"
            echo "  --webm       Output WebM only"
            echo "  --all        Output all formats (default)"
            echo "  --fps N      Frames per second (default: 30)"
            echo "  --scale WxH  Output scale (default: 800:-1)"
            echo "  --quality    Quality preset: low, medium, high (default: high)"
            exit 0
            ;;
        *)
            if [[ -z "$FRAMES_DIR" ]]; then
                FRAMES_DIR="$1"
            else
                OUTPUT_NAME="$1"
            fi
            shift
            ;;
    esac
done

# Validate
if [[ -z "$FRAMES_DIR" ]]; then
    echo "Error: Please specify frames directory"
    exit 1
fi

if [[ ! -d "$FRAMES_DIR" ]]; then
    echo "Error: Frames directory not found: $FRAMES_DIR"
    exit 1
fi

# Check for ffmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg not found. Please install ffmpeg."
    echo "Windows: choco install ffmpeg  OR  scoop install ffmpeg"
    echo "macOS: brew install ffmpeg"
    echo "Linux: sudo apt install ffmpeg"
    exit 1
fi

# Detect frame pattern
FRAME_PATTERN=""
if ls "$FRAMES_DIR"/frame-*.png 1> /dev/null 2>&1; then
    FRAME_PATTERN="$FRAMES_DIR/frame-%04d.png"
elif ls "$FRAMES_DIR"/*.png 1> /dev/null 2>&1; then
    FRAME_PATTERN="$FRAMES_DIR/%04d.png"
elif ls "$FRAMES_DIR"/*.jpg 1> /dev/null 2>&1; then
    FRAME_PATTERN="$FRAMES_DIR/%04d.jpg"
else
    echo "Error: No frame images found in $FRAMES_DIR"
    exit 1
fi

echo "Frame Sequence Converter"
echo "========================"
echo "Input: $FRAME_PATTERN"
echo "Output: $OUTPUT_NAME"
echo "FPS: $FPS"
echo "Scale: $SCALE"

# Quality presets
CRF="18"
case $QUALITY in
    low)
        CRF="28"
        ;;
    medium)
        CRF="23"
        ;;
    high)
        CRF="18"
        ;;
esac

# Create output directory
OUTPUT_DIR=$(dirname "$OUTPUT_NAME")
mkdir -p "$OUTPUT_DIR"

# Convert to GIF
convert_gif() {
    echo ""
    echo "Creating GIF..."
    ffmpeg -y -r $FPS -i "$FRAME_PATTERN" \
        -vf "fps=$FPS,scale=$SCALE:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5" \
        "${OUTPUT_NAME}.gif"
    echo "Created: ${OUTPUT_NAME}.gif"
}

# Convert to MP4
convert_mp4() {
    echo ""
    echo "Creating MP4..."
    ffmpeg -y -r $FPS -i "$FRAME_PATTERN" \
        -c:v libx264 -crf $CRF -preset slow -pix_fmt yuv420p \
        -vf "scale=$SCALE" \
        "${OUTPUT_NAME}.mp4"
    echo "Created: ${OUTPUT_NAME}.mp4"
}

# Convert to WebM
convert_webm() {
    echo ""
    echo "Creating WebM..."
    ffmpeg -y -r $FPS -i "$FRAME_PATTERN" \
        -c:v libvpx-vp9 -crf 30 -b:v 0 -pix_fmt yuv420p \
        -vf "scale=$SCALE" \
        "${OUTPUT_NAME}.webm"
    echo "Created: ${OUTPUT_NAME}.webm"
}

# Execute based on format
case $FORMAT in
    gif)
        convert_gif
        ;;
    mp4)
        convert_mp4
        ;;
    webm)
        convert_webm
        ;;
    all)
        convert_mp4
        convert_webm
        convert_gif
        ;;
esac

echo ""
echo "Conversion complete!"
