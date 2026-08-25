@echo off
title WELLORA AI - Continuous Server Launcher
echo ========================================================
echo   WELLORA AI - Heavy Crude Digital Twin Auto Launcher
echo ========================================================
echo Starting local web server on http://localhost:5173 ...

cd /d "%~dp0"

REM Check node modules
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

REM Launch browser in 3 seconds asynchronously
start "" http://localhost:5173/

REM Run Vite preview or dev server continuously
call npm run dev -- --host 0.0.0.0 --port 5173
