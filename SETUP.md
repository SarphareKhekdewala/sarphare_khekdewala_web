# 🚀 Quick Start Guide - Sarphare Khekdewala

This guide will help you set up and run the website on your local machine.

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (v18 or higher) installed
- **MongoDB** running (locally or MongoDB Atlas)
- **Razorpay** test account (for payment testing)
- **Gmail** account (for email notifications)

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Install Dependencies
```powershell
cd c:\Users\akash.sarfare\Documents\SKCS\sarphare-khekdewala
npm install
```

### Step 2: Setup Environment Variables
Create a `.env` file in the project root:
```powershell
Copy-Item .env.example .env
```

Edit `.env` and fill in your values:
```env
# Database
DATABASE_URL="mongodb://localhost:27017/sarphare-khekdewala"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/sarphare-khekdewala"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here-change-this-in-production"

# Razorpay (Get from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxxx"

# Email (Gmail SMTP)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"  # Generate from Google Account settings
EMAIL_FROM="Sarphare Khekdewala <your-email@gmail.com>"
```

### Step 3: Initialize Database
```powershell
npm run db:push
```

### Step 4: Create Admin User & Seed Data
```powershell
# Create admin user
npm run db:create-admin

# Seed sample products (8 products - crabs and fish)
npm run db:seed
```

### Step 5: Start Development Server
```powershell
npm run dev
```

**🎉 Done!** Open http://localhost:3000 in your browser.

---

## 🔑 Default Login Credentials

**Admin Panel:** http://localhost:3000/admin/login

- **Email:** admin@sarpharekhekdewala.com
- **Password:** Admin@123

---

## 📱 Features Overview

### Customer Features:
- ✅ Browse products (Mud Crabs & Fish)
- ✅ Add to cart with quantity selection
- ✅ Checkout with customer details
- ✅ Online payment via Razorpay
- ✅ Order confirmation page
- ✅ Email notifications

### Admin Features:
- ✅ Dashboard with statistics
- ✅ Order management (view, filter by date/status, update status)
- ✅ Product management (add, edit, delete, toggle availability)
- ✅ Real-time updates

---

## 🛠️ Common Commands

```powershell
# Development
npm run dev              # Start dev server on http://localhost:3000

# Database
npm run db:push          # Sync Prisma schema to database
npm run db:seed          # Seed sample data
npm run db:create-admin  # Create/reset admin user

# Production
npm run build            # Build for production
npm start                # Start production server

# Utilities
npm run lint             # Check code quality
```

---

## 🔧 Configuration Details

### 1. MongoDB Setup

**Option A: Local MongoDB**
```powershell
# Install MongoDB Community Edition from mongodb.com
# Start MongoDB service
# Use connection string: mongodb://localhost:27017/sarphare-khekdewala
```

**Option B: MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string from "Connect" > "Connect your application"
4. Add to `.env` as DATABASE_URL

### 2. Razorpay Setup (Test Mode)
1. Go to https://dashboard.razorpay.com/
2. Sign up/Login
3. Go to Settings > API Keys
4. Generate Test Keys
5. Copy `Key ID` and `Key Secret` to `.env`

**Test Cards for Razorpay:**
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: 123456

### 3. Gmail App Password Setup
1. Go to Google Account settings
2. Enable 2-Step Verification
3. Go to Security > App Passwords
4. Generate password for "Mail"
5. Copy password to `.env` as EMAIL_PASSWORD

---

## 📁 Project Structure

```
sarphare-khekdewala/
├── app/                      # Next.js App Router
│   ├── admin/               # Admin pages (protected)
│   │   ├── login/          # Admin login
│   │   ├── dashboard/      # Dashboard with stats
│   │   ├── orders/         # Orders management
│   │   └── products/       # Products management
│   ├── products/           # Customer product listing
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout & payment
│   ├── order-confirmation/ # Order success page
│   └── api/                # API routes
│       ├── auth/          # NextAuth
│       ├── products/      # Products CRUD
│       ├── orders/        # Orders management
│       ├── razorpay/      # Payment integration
│       └── admin/         # Admin stats
├── components/              # Reusable UI components
├── lib/                    # Utilities
│   ├── prisma.ts          # Database client
│   ├── auth.ts            # Authentication config
│   ├── email.ts           # Email functions
│   └── utils.ts           # Helper functions
├── prisma/
│   └── schema.prisma      # Database schema
├── scripts/
│   ├── seed.ts            # Seed sample data
│   └── create-admin.ts    # Create admin user
└── types/                  # TypeScript types
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@prisma/client'"
**Solution:**
```powershell
npm run postinstall
```

### Issue: "Failed to connect to database"
**Solution:**
- Check MongoDB is running
- Verify DATABASE_URL in `.env`
- For local: `mongodb://localhost:27017/sarphare-khekdewala`

### Issue: "Payment not working"
**Solution:**
- Verify Razorpay keys in `.env`
- Use test mode keys (starting with `rzp_test_`)
- Check browser console for errors

### Issue: "Emails not sending"
**Solution:**
- Verify Gmail app password in `.env`
- Make sure 2-Step Verification is enabled
- Check EMAIL_USER and EMAIL_PASSWORD are correct

### Issue: "Cannot login to admin"
**Solution:**
```powershell
npm run db:create-admin
```
Default credentials:
- Email: admin@sarpharekhekdewala.com
- Password: Admin@123

---

## 🚀 Next Steps

1. **Customize Products:**
   - Login to admin panel
   - Go to Products page
   - Edit sample products with your actual inventory
   - Add product images (upload to hosting or use URLs)

2. **Test Customer Flow:**
   - Browse products at http://localhost:3000
   - Add items to cart
   - Checkout with test details
   - Use Razorpay test card for payment
   - Check order confirmation and admin panel

3. **Test Admin Features:**
   - View dashboard statistics
   - Manage orders (filter by date/status)
   - Update order status
   - Manage products (add/edit/delete)

4. **Setup for Production:**
   - Use MongoDB Atlas for database
   - Use Razorpay live keys
   - Update environment variables
   - Deploy to Vercel (see INSTALLATION.md)

---

## 📞 Support

If you face any issues:
1. Check error messages in terminal
2. Check browser console (F12)
3. Verify all environment variables are set
4. Make sure all dependencies are installed

---

## 🎯 Testing Checklist

- [ ] Products page loads and shows all products
- [ ] Can add items to cart
- [ ] Cart updates correctly
- [ ] Checkout form accepts details
- [ ] Razorpay payment modal opens
- [ ] Order confirmation page shows after payment
- [ ] Admin login works
- [ ] Dashboard shows correct statistics
- [ ] Can view and filter orders
- [ ] Can update order status
- [ ] Can manage products (add/edit/delete)
- [ ] Email notifications sent (check spam folder)

---

**Need help?** Check the detailed INSTALLATION.md for more information.
