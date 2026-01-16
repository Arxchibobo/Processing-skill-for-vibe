# Processing Sketch Runner - PowerShell
# Usage: .\run-sketch.ps1 -SketchPath "path\to\sketch" [-Export] [-Frames]

param(
    [Parameter(Mandatory=$true)]
    [string]$SketchPath,

    [Parameter(Mandatory=$false)]
    [string]$ProcessingPath = "C:\Program Files\Processing\processing-java.exe",

    [switch]$Export,
    [switch]$Frames,
    [switch]$Present
)

# Verify Processing installation
if (-not (Test-Path $ProcessingPath)) {
    Write-Error "Processing not found at: $ProcessingPath"
    Write-Host "Please install Processing from https://processing.org/download/"
    exit 1
}

# Verify sketch path
if (-not (Test-Path $SketchPath)) {
    Write-Error "Sketch not found at: $SketchPath"
    exit 1
}

# Get absolute path
$SketchPath = (Resolve-Path $SketchPath).Path

Write-Host "Processing Sketch Runner" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host "Sketch: $SketchPath"

# Build command
$args = @("--sketch=`"$SketchPath`"")

if ($Export) {
    $args += "--export"
    Write-Host "Mode: Export Application" -ForegroundColor Yellow
} elseif ($Present) {
    $args += "--present"
    Write-Host "Mode: Present (fullscreen)" -ForegroundColor Yellow
} else {
    $args += "--run"
    Write-Host "Mode: Run" -ForegroundColor Green
}

if ($Frames) {
    # Create frames directory
    $framesDir = Join-Path $SketchPath "frames"
    if (-not (Test-Path $framesDir)) {
        New-Item -ItemType Directory -Path $framesDir | Out-Null
    }
    Write-Host "Frames will be saved to: $framesDir" -ForegroundColor Magenta
}

# Run Processing
Write-Host "`nStarting Processing..." -ForegroundColor Green
$process = Start-Process -FilePath $ProcessingPath -ArgumentList $args -PassThru -NoNewWindow

Write-Host "Processing PID: $($process.Id)"
Write-Host "Press Ctrl+C to stop"

# Wait for completion
$process.WaitForExit()

Write-Host "`nProcessing finished with exit code: $($process.ExitCode)" -ForegroundColor Cyan
