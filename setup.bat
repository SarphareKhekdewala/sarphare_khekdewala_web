@echo off
echo ========================================
echo Sarphare Khekdewala - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed!
    echo Please install Node.js from https://nodejs.org/
    echo Download LTS version ^(v18 or higher^)
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if .env exists
echo Checking environment configuration...
if not exist ".env" (
    echo [WARNING] .env file not found. Creating from template...
    if exist ".env.example" (
        copy ".env.example" ".env"
        echo [OK] Created .env from template
        echo.
        echo [IMPORTANT] You need to edit .env file with your configuration!
        echo Configure:
        echo   - DATABASE_URL ^(MongoDB connection^)
        echo   - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
        echo   - EMAIL_USER and EMAIL_PASSWORD
        echo.
        echo Press any key to open .env file in notepad...
        pause
        notepad .env
    ) else (
        echo [ERROR] .env.example not found!
        pause
        exit /b 1
    )
) else (
    echo [OK] .env file found
)

echo.
echo ========================================
echo Installing Dependencies...
echo ========================================
echo This may take 3-5 minutes...
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!

echo.
echo ========================================
echo Setting up Database...
echo ========================================
echo.

echo Pushing database schema...
call npm run db:push

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to create database schema!
    echo Make sure MongoDB is running and DATABASE_URL is correct in .env
    pause
    exit /b 1
)

echo [OK] Database schema created!
echo.

echo Creating admin user and seeding sample data...
call npm run db:seed

if %errorlevel% neq 0 (
    echo [WARNING] Failed to seed database. You can run 'npm run db:seed' later.
) else (
    echo [OK] Database seeded successfully!
)

echo.
echo ========================================
echo Setup Complete! 🎉
echo ========================================
echo.
echo Admin Credentials:
echo   Email: admin@sarpharekhekdewala.com
echo   Password: Admin@123
echo.
echo To start the application, run:
echo   npm run dev
echo.
echo Then open your browser to:
echo   http://localhost:3000
echo.
echo Admin Panel:
echo   http://localhost:3000/admin/login
echo.
echo Press any key to start the development server...
pause

npm run dev
