# Redis停止スクリプト（WSL2用）

Write-Host "Redisを停止しています..." -ForegroundColor Yellow

wsl -d Ubuntu -e bash -c "sudo service redis-server stop"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Redisが正常に停止しました。" -ForegroundColor Green
} else {
    Write-Host "警告: Redisの停止中にエラーが発生しました。" -ForegroundColor Yellow
}
