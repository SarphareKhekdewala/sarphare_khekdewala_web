# Sarphare Khekdewala - E-Commerce Website

## Project Transfer Instructions

This ZIP contains the complete e-commerce website for Sarphare Khekdewala seafood business.

### 📦 What's Inside

This package includes:
- Complete Next.js 14 application
- All frontend and backend code
- Database schema
- Admin dashboard
- Payment integration (Razorpay)
- Email notifications
- Sample data scripts
- Full documentation

### 🚀 Setup on New System

#### 1. Extract the ZIP
Extract all files to a location like: `C:\Projects\sarphare-khekdewala`

#### 2. Install Prerequisites

**Install Node.js:**
- Download from: https://nodejs.org/
- Get version 18 LTS or higher
- During installation, check "Add to PATH"
- Restart terminal after installation

**Install MongoDB:**
- **Option A - Local:** Download from https://www.mongodb.com/try/download/community
- **Option B - Cloud (Easier):** Use MongoDB Atlas free tier at https://www.mongodb.com/cloud/atlas

#### 3. Install Project Dependencies
```cmd
cd C:\path\to\sarphare-khekdewala
npm install
```
This will install all required packages (~5 minutes)

#### 4. Configure Environment Variables
Rename `.env.example` to `.env` and fill in:

```env
# Database - Choose one:
# Local MongoDB:
DATABASE_URL="mongodb://localhost:27017/sarphare-khekdewala"
# OR MongoDB Atlas (recommended):
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/sarphare-khekdewala"

# NextAuth (change the secret to any random string)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-any-random-long-string-abc123xyz789"

# Razorpay (get free test keys from https://dashboard.razorpay.com/)
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxxx"

# Gmail SMTP for emails
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-digit-app-password"
EMAIL_FROM="Sarphare Khekdewala <your-email@gmail.com>"
```

#### 5. Setup Database
```cmd
npm run db:push
npm run db:seed
```

#### 6. Start the Application
```cmd
npm run dev
```

Open browser: http://localhost:3000

### 🔑 Default Credentials

**Admin Panel:** http://localhost:3000/admin/login
- Email: `admin@sarpharekhekdewala.com`
- Password: `Admin@123`

### 📚 Documentation Files

- `SETUP.md` - Quick 5-step setup guide
- `INSTALLATION.md` - Detailed installation with troubleshooting
- `PROJECT_SUMMARY.md` - Complete feature list
- `README.md` - Project overview

### ⚡ Quick Commands Reference

```cmd
npm install              # Install dependencies
npm run dev             # Start development server
npm run db:push         # Sync database schema
npm run db:seed         # Add sample products
npm run db:create-admin # Create/reset admin user
npm run build           # Build for production
npm start               # Run production build
```

### 🧪 Test Payment (Razorpay Test Mode)

- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: Any future date
- OTP: 123456

### 📞 Need Help?

1. Check `INSTALLATION.md` for detailed setup
2. Check `SETUP.md` for troubleshooting
3. Make sure all environment variables in `.env` are set correctly
4. Verify MongoDB is running (if using local)

### ✅ Verify Installation

After setup, test these:
- [ ] Homepage loads at http://localhost:3000
- [ ] Products page shows items
- [ ] Can add items to cart
- [ ] Admin login works
- [ ] Dashboard shows statistics
- [ ] Can manage products and orders

---

**Built for:** Sarphare Khekdewala - Fresh Seafood Business
**Coverage:** Mumbai, Thane, Navi Mumbai
**Products:** Live Mud Crabs & Fresh Fish
