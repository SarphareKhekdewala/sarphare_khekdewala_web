# 📦 START HERE - Sarphare Khekdewala E-Commerce

## 🎯 You've Got Everything You Need!

This is a **complete, production-ready** e-commerce website for selling fresh seafood (mud crabs and fish) online.

---

## ⚡ FASTEST SETUP (Automated)

### Windows Users:

**Option 1: PowerShell (Recommended)**
```powershell
# Right-click setup.ps1 → Run with PowerShell
# OR open PowerShell in this folder and run:
.\setup.ps1
```

**Option 2: Command Prompt**
```cmd
# Double-click setup.bat
# OR open CMD in this folder and run:
setup.bat
```

The automated setup will:
- ✅ Check if Node.js is installed
- ✅ Create .env from template
- ✅ Install all dependencies
- ✅ Setup database
- ✅ Create admin user
- ✅ Add 8 sample products
- ✅ Start the server

**That's it!** 🎉

---

## 📖 Manual Setup (If You Prefer)

### Step 1: Install Prerequisites
- **Node.js v18+** from https://nodejs.org/
- **MongoDB** (local) OR MongoDB Atlas (cloud free tier)

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
# Copy the template
copy .env.example .env

# Edit .env with your MongoDB, Razorpay, and Gmail details
```

### Step 4: Setup Database
```bash
npm run db:push
npm run db:seed
```

### Step 5: Start Application
```bash
npm run dev
```

Open: http://localhost:3000

---

## 🔑 Default Login (After Setup)

**Admin Panel:** http://localhost:3000/admin/login

- **Email:** `admin@sarpharekhekdewala.com`
- **Password:** `Admin@123`

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **TRANSFER_README.md** | Instructions for new system setup |
| **SETUP.md** | Quick 5-step setup guide |
| **INSTALLATION.md** | Detailed installation with troubleshooting |
| **PROJECT_SUMMARY.md** | Complete features & project info |
| **README.md** | Project overview |
| **ZIP_CHECKLIST.md** | What's included in this package |

---

## ✨ What You're Getting

### Customer-Facing Website:
- ✅ Landing page with hero & features
- ✅ Product catalog (crabs & fish)
- ✅ Shopping cart
- ✅ Checkout with payment
- ✅ Order confirmation
- ✅ Email notifications

### Admin Dashboard:
- ✅ Login & authentication
- ✅ Dashboard with statistics
- ✅ Orders management (filter by date/status)
- ✅ Update order status
- ✅ Products management (add/edit/delete)
- ✅ Stock management

### Technical Features:
- ✅ Next.js 14 (React framework)
- ✅ TypeScript (type safety)
- ✅ MongoDB database with Prisma
- ✅ Razorpay payment gateway
- ✅ Email notifications (Nodemailer)
- ✅ Responsive mobile-first design
- ✅ 8 sample products included

---

## 🧪 Test the Website

After setup, test these:

1. **Homepage:** http://localhost:3000
2. **Products:** Browse and add to cart
3. **Checkout:** Use test payment details
4. **Admin Login:** http://localhost:3000/admin/login
5. **Dashboard:** View statistics
6. **Manage Orders:** Filter and update status
7. **Manage Products:** Add/edit products

### Razorpay Test Card:
- **Card:** 4111 1111 1111 1111
- **CVV:** 123
- **Expiry:** Any future date
- **OTP:** 123456

---

## 🚀 What You Need to Configure

In the `.env` file:

### 1. MongoDB (Choose One):
```env
# Local MongoDB:
DATABASE_URL="mongodb://localhost:27017/sarphare-khekdewala"

# OR MongoDB Atlas (free cloud):
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/sarphare-khekdewala"
```

### 2. Razorpay (Get Free Test Keys):
```env
# Get from: https://dashboard.razorpay.com/
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="xxxxx"
```

### 3. Gmail SMTP (For Order Emails):
```env
# Use app password from Google Account settings
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-digit-app-password"
```

---

## 📁 Project Structure

```
sarphare-khekdewala/
├── setup.bat / setup.ps1    # Automated setup scripts
├── .env.example              # Configuration template
├── package.json              # Dependencies
│
├── app/                      # Next.js pages
│   ├── page.tsx             # Landing page
│   ├── products/            # Product catalog
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout & payment
│   ├── order-confirmation/  # Success page
│   ├── admin/               # Admin dashboard
│   │   ├── login/          # Admin login
│   │   ├── dashboard/      # Statistics
│   │   ├── orders/         # Order management
│   │   └── products/       # Product management
│   └── api/                 # Backend APIs
│
├── components/              # Reusable UI components
├── lib/                    # Core utilities
├── prisma/                 # Database schema
├── scripts/                # Setup scripts
└── types/                  # TypeScript definitions
```

---

## ⚡ Quick Commands

```bash
# Development
npm run dev                # Start dev server (http://localhost:3000)

# Database
npm run db:push           # Sync database schema
npm run db:seed           # Add sample data
npm run db:create-admin   # Create/reset admin user

# Production
npm run build             # Build for production
npm start                 # Start production server
```

---

## 🐛 Troubleshooting

### "Node.js not found"
Install from https://nodejs.org/ (LTS version)

### "Cannot connect to database"
- Check MongoDB is running
- Verify DATABASE_URL in `.env`

### "Cannot login to admin"
```bash
npm run db:create-admin
```

### "Payment not working"
- Get test keys from https://dashboard.razorpay.com/
- Make sure keys start with `rzp_test_`

### "Emails not sending"
- Enable 2-Step Verification in Google Account
- Generate App Password in Security settings
- Use that 16-digit password in `.env`

**More help:** See `INSTALLATION.md` for detailed troubleshooting

---

## 🎯 Ready to Launch?

1. ✅ Extract this ZIP
2. ✅ Run `setup.bat` or `setup.ps1`
3. ✅ Configure `.env` when prompted
4. ✅ Wait for automatic setup
5. ✅ Start using the website!

---

## 📞 Sample Data Included

The seed script creates:
- 1 Admin user
- 3 Mud crab products (Large, Medium, Small)
- 5 Fish products (Pomfret, Rawas, Surmai, Bangda, Bombil)

All with:
- English & Marathi names
- Pricing in INR
- Stock quantities
- Descriptions

---

## 🎉 You're All Set!

Everything is ready to go. Just:
1. Run the setup script
2. Configure your `.env`
3. Start building your business!

**Questions?** Check the documentation files listed above.

---

**Built for:** Fresh Seafood E-Commerce
**Coverage:** Mumbai, Thane, Navi Mumbai
**Products:** Live Mud Crabs & Fresh Fish
**Ready to Deploy:** Yes! ✅
