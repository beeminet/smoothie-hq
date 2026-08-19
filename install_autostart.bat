@echo off
title Install Juice Server Autostart
cls
echo ====================================================
echo   INSTALL JUICE SERVER TO START AUTOMATICALLY ON BOOT
echo ====================================================
echo.
set "TARGET_DIR=%~dp0"
set "VBS_PATH=%TARGET_DIR%start_server_silent.vbs"
set "STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT_PATH=%STARTUP_DIR%\JuiceServerSilent.lnk"

powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = 'wscript.exe'; $s.Arguments = '\"%VBS_PATH%\"'; $s.WorkingDirectory = '%TARGET_DIR%'; $s.Save()"

echo [SUCCESS] Juice Server will now run silently in the background whenever Windows starts!
echo You can use your phone anytime on home Wi-Fi with zero setup.
echo.
echo Launching server silently now...
wscript "%VBS_PATH%"
echo Done!
pause
