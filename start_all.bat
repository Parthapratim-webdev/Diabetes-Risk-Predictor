@echo off
echo ========================================================
echo Starting Diabetes Risk Predictor Full Stack Platform...
echo ========================================================
echo 1. Starting Machine Learning Microservice (Port 5001)...
start "ML Model (Port 5001)" cmd /k "cd /d %~dp0ml-model && python app.py"

echo 2. Starting Express Backend API (Port 5000)...
start "Backend API (Port 5000)" cmd /k "cd /d %~dp0backend && npm start"

echo 3. Starting React Frontend (Port 5173)...
start "Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo ========================================================
echo All 3 services are launching in separate windows!
echo  - Frontend:        http://localhost:5173
echo  - Backend API:     http://localhost:5000
echo  - ML Model API:    http://localhost:5001
echo ========================================================
