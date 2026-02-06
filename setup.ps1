# Quick Setup Script for Windows PowerShell
# Run this after extracting the ZIP on your new system

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Sarphare Khekdewala - Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is NOT installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host "Download LTS version (v18 or higher)" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""

# Check if .env exists
Write-Host "Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠ .env file not found. Creating from template..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ Created .env from template" -ForegroundColor Green
        Write-Host "⚠ IMPORTANT: Edit .env file with your configuration!" -ForegroundColor Red
        Write-Host "You need to configure:" -ForegroundColor Yellow
        Write-Host "  - DATABASE_URL (MongoDB connection)" -ForegroundColor Yellow
        Write-Host "  - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET" -ForegroundColor Yellow
        Write-Host "  - EMAIL_USER and EMAIL_PASSWORD" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Press any key to open .env file in notepad..." -ForegroundColor Cyan
        pause
        notepad .env
    } else {
        Write-Host "✗ .env.example not found!" -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installing Dependencies..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "This may take 3-5 minutes..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✗ Failed to install dependencies!" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up Database..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Pushing database schema..." -ForegroundColor Yellow
npm run db:push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database schema created!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create database schema!" -ForegroundColor Red
    Write-Host "Make sure MongoDB is running and DATABASE_URL is correct in .env" -ForegroundColor Yellow
    pause
    exit
}

Write-Host ""
Write-Host "Creating admin user and seeding sample data..." -ForegroundColor Yellow
npm run db:seed

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database seeded successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠ Failed to seed database. You can run 'npm run db:seed' later." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Admin Credentials:" -ForegroundColor Cyan
Write-Host "  Email: admin@sarpharekhekdewala.com" -ForegroundColor White
Write-Host "  Password: Admin@123" -ForegroundColor White
Write-Host ""
Write-Host "To start the application, run:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then open your browser to:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Admin Panel:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000/admin/login" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to start the development server..." -ForegroundColor Green
pause

npm run dev
