@echo off
REM ============================================================
REM  WhisperShelf — Windows Launch Script
REM  Run this to start the desktop application.
REM  Usage: scripts\run.bat
REM ============================================================

echo.
echo   WhisperShelf
echo   -----------------------------------

REM Check for Node.js
where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo   ERROR: Node.js not found.
  echo   Install from https://nodejs.org
  pause
  exit /B 1
)

FOR /F "tokens=*" %%i IN ('node -v') DO SET NODE_VER=%%i
echo   Node.js %NODE_VER% found.

REM Install dependencies if needed
IF NOT EXIST "node_modules" (
  echo   Installing dependencies...
  call npm install
)

REM Check for Cargo (Rust)
where cargo >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
  echo   Rust found. Launching desktop app...
  echo.
  call npm run tauri:dev
) ELSE (
  echo   Rust/Cargo not found. Launching as browser app.
  echo   Install Rust at https://rustup.rs for native desktop mode.
  echo.
  echo   Starting dev server — open http://localhost:1420
  echo.
  call npm run dev
)

pause
