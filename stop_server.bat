@echo off
title Stop Juice Server
cls
echo Stopping background Juice Server on port 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)
echo Juice Server has been stopped.
timeout /t 2 >nul
