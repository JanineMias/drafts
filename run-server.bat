@echo off

:: Build Command for Frontend Astro (OPPA-SITE)
echo Build Frontend..
call npm run build

::CHECK IF SUCCESSFUL
if %errorlevel% neq 0 (
    echo Frontend build failed.Please check the errors above.
    exit /b %errorlevel%
)

echo Frontend build SUCCESSFUL
 
:: NAVIGATE BACKEND DIR
cd node-api

::START SERVER
node index.js