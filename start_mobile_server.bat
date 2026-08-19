@echo off
title Smoothie HQ Mobile Server
cd /d "%~dp0"
cls

echo ================================================================
echo             SMOOTHIE HQ - ROCK-SOLID MOBILE SERVER
echo ================================================================
echo.
echo Freeing port 8000 from any previous process...
powershell -Command "Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo.
echo Launching Smoothie HQ Multi-Threaded Sync Server...
python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python server stopped with error code %ERRORLEVEL%.
    pause
)
