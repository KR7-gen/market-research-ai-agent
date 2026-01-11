# Redis startup script for WSL2

Write-Host "Starting Redis..." -ForegroundColor Yellow

# Check if WSL2 is installed
$wslInstalled = Get-Command wsl -ErrorAction SilentlyContinue
if (-not $wslInstalled) {
    Write-Host "Error: WSL2 is not installed." -ForegroundColor Red
    Write-Host "Please install WSL2 and try again." -ForegroundColor Yellow
    exit 1
}

# Check if Redis is installed in WSL2
Write-Host "Checking Redis installation..." -ForegroundColor Cyan
$redisInstalled = wsl -d Ubuntu -e bash -c "which redis-server" 2>$null

if (-not $redisInstalled) {
    Write-Host "Redis is not installed. Installing Redis..." -ForegroundColor Yellow
    wsl -d Ubuntu -e bash -c "sudo apt-get update && sudo apt-get install -y redis-server"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to install Redis." -ForegroundColor Red
        exit 1
    }
}

# Start Redis
Write-Host "Starting Redis service..." -ForegroundColor Cyan
wsl -d Ubuntu -e bash -c "sudo service redis-server start"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Redis started successfully!" -ForegroundColor Green
    Write-Host "Verifying connection..." -ForegroundColor Cyan
    
    # Verify connection
    Start-Sleep -Seconds 2
    $status = wsl -d Ubuntu -e bash -c "sudo service redis-server status" 2>$null
    
    if ($status -match "running") {
        Write-Host "Redis is running properly." -ForegroundColor Green
    } else {
        Write-Host "Warning: Could not verify Redis status." -ForegroundColor Yellow
    }
} else {
    Write-Host "Error: Failed to start Redis." -ForegroundColor Red
    exit 1
}
