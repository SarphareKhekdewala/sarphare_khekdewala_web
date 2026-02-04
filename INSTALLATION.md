# Installation and Setup Guide - Sarphare Khekdewala

## Prerequisites Installation

### 1. Install Node.js
1. Go to https://nodejs.org/
2. Download LTS version (v20.x or later)
3. Run the installer
4. Check installation: Open Command Prompt and type:
   ```
   node --version
   npm --version
   ```

### 2. Install MongoDB
**Option A: Local Installation**
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Install with default settings
4. MongoDB will run on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

## Project Setup

### Step 1: Navigate to Project
```bash
cd c:\Users\akash.sarfare\Documents\SKCS\sarphare-khekdewala
```

### Step 2: Install Dependencies
```bash
npm install
```
This will take 2-5 minutes to download all packages.

### Step 3: Configure Environment Variables
1. Copy the example file:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` file and update:
   - `DATABASE_URL`: Your MongoDB connection string
   - `NEXTAUTH_SECRET`: Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
   - `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: Get from Razorpay dashboard
   - Email settings (Gmail example):
     - `EMAIL_USER`: your-email@gmail.com
     - `EMAIL_PASSWORD`: App password (not your Gmail password)
     - To get Gmail app password: Google Account → Security → 2-Step Verification → App passwords

### Step 4: Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### Step 5: Create Admin User (Optional - First Time)
Create a script or use Prisma Studio:
```bash
npx prisma studio
```
Then manually add a user in the `User` table with bcrypt hashed password.

Or run this Node script (save as `create-admin.js`):
```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@sarpharekhekdewala.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('Admin created:', admin);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```
Run with: `node create-admin.js`

### Step 6: Start Development Server
```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

## Getting Razorpay API Keys

1. Go to https://razorpay.com/
2. Sign up / Log in
3. Go to Settings → API Keys
4. Generate Test Keys for development
5. Copy Key ID and Key Secret to your `.env` file

## Testing the Application

### Customer Flow:
1. Visit http://localhost:3000
2. Click "Order Now" or go to Products
3. Add items to cart
4. Go to checkout
5. Fill delivery details
6. Complete payment (use Razorpay test cards)

### Admin Flow:
1. Visit http://localhost:3000/admin/login
2. Login with: admin@sarpharekhekdewala.com / Admin@123
3. View dashboard, orders, manage products

## Deployment (After Development)

### Deploy to Vercel:
1. Push code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Add environment variables in Vercel settings
5. Deploy

### Use MongoDB Atlas for production database

## Troubleshooting

### "Module not found" errors:
```bash
npm install
```

### Database connection issues:
- Check if MongoDB is running (local)
- Verify DATABASE_URL in .env
- For Atlas: Check IP whitelist (allow 0.0.0.0/0 for development)

### Port 3000 already in use:
```bash
# Kill the process or use different port:
npm run dev -- -p 3001
```

### Email not sending:
- Verify EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD
- For Gmail: Use app-specific password, enable 2-factor auth

## Support
For any issues, refer to:
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs
- Razorpay docs: https://razorpay.com/docs
