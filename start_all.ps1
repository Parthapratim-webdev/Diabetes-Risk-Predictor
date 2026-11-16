Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Starting Diabetes Risk Predictor Full Stack Platform..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$root = $PSScriptRoot

Write-Host "1. Starting Machine Learning Microservice (Port 5001)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\ml-model'; python app.py"

Write-Host "2. Starting Express Backend API (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; npm start"

Write-Host "3. Starting React Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host ""
Write-Host "All 3 services have been launched in separate windows:" -ForegroundColor Green
Write-Host " - Frontend:        http://localhost:5173" -ForegroundColor Green
Write-Host " - Backend API:     http://localhost:5000" -ForegroundColor Green
Write-Host " - ML Model API:    http://localhost:5001" -ForegroundColor Green
