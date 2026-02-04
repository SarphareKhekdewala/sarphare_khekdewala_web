# Sarphare Khekdewala - Fresh Seafood E-commerce

A modern Next.js e-commerce platform for selling fresh mud crabs and fish in Mumbai, Thane, and Navi Mumbai.

## Features

### Customer Features
- Browse fresh mud crabs and fish with images and prices
- Add products to cart
- Area-wise delivery (Mumbai, Thane, Navi Mumbai)
- Online payment via Razorpay
- Order confirmation via email
- Real-time order tracking

### Admin Features
- Secure admin dashboard
- Order management (view, update status)
- Product management (CRUD operations)
- Customer database
- Date/time-wise order filtering
- Sales reports

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Payment**: Razorpay
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. **Install Node.js dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` file with your actual credentials:
- MongoDB connection string
- Razorpay API keys
- Email configuration
- NextAuth secret

3. **Initialize the database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First Time Setup

1. Access admin panel at `/admin/login`
2. Use default credentials from `.env` file
3. Change password immediately
4. Add products from admin dashboard

## Project Structure

```
sarphare-khekdewala/
├── app/                    # Next.js App Router pages
│   ├── (customer)/        # Customer-facing pages
│   ├── admin/             # Admin dashboard pages
│   └── api/               # API routes
├── components/            # Reusable React components
├── lib/                   # Utility functions
├── prisma/                # Database schema
├── public/                # Static assets
└── types/                 # TypeScript types
```

## Default Admin Credentials

- Email: admin@sarpharekhekdewala.com
- Password: Admin@123

**⚠️ Change these immediately after first login!**

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### MongoDB Atlas Setup

1. Create cluster at mongodb.com
2. Get connection string
3. Update DATABASE_URL in .env

## Support

For issues or questions, contact: [your-email@example.com]

## License

Private - All rights reserved to Sarphare Khekdewala
