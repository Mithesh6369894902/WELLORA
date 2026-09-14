@echo off
echo ===================================================
echo   WELLORA - Deploying Permanently to Vercel
echo ===================================================
echo.
echo Building production assets...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed! Please resolve errors before deploying.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Launching Vercel deployment...
echo (If prompted, log in to your Vercel account or press Enter for defaults)
echo.
call npx vercel --prod

echo.
echo ===================================================
echo   Deployment Finished!
echo ===================================================
pause
