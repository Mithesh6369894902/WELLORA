@echo off
title Configure Windows Auto-Start for WELLORA AI
echo ========================================================
echo   Setting up Auto-Start on System Boot for WELLORA AI
echo ========================================================

set "TARGET_BAT=%~dp0start_app_permanently.bat"
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT_PATH=%STARTUP_FOLDER%\WELLORA_Digital_Twin.lnk"

echo Target script: %TARGET_BAT%
echo Startup folder: %STARTUP_FOLDER%

powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%TARGET_BAT%'; $s.WorkingDirectory = '%~dp0'; $s.WindowStyle = 7; $s.Save()"

if exist "%SHORTCUT_PATH%" (
    echo.
    echo [SUCCESS] Auto-start shortcut successfully added to Windows Startup folder!
    echo Whenever your computer turns on, WELLORA AI will automatically launch.
    echo.
) else (
    echo [ERROR] Failed to create shortcut automatically.
)

pause
