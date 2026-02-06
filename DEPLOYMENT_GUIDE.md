# Deployment Guide - Sarphare Khekdewala

## Database Capacity Analysis

### Current Setup: MongoDB Atlas Free Tier (M0)
✅ **Can handle 100 orders/day easily**

**Specifications:**
- Storage: 512 MB (sufficient for ~50,000+ orders)
- RAM: Shared
- Connections: Up to 500 concurrent
- Network Transfer: No limit

**Estimated Usage for 100 orders/day:**
- Per Order: ~2-5 KB
- Monthly: ~15 MB
- Yearly: ~180 MB (well within 512 MB limit)

**When to upgrade:**
- If you exceed 300+ orders/day consistently
- If you have more than 100 concurrent users
- If you need better performance/reliability

---

## Deployment Options

### Option 1: Vercel (Recommended - Free Tier Available)

**Steps:**

1. **Prepare Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   - Create new repository on GitHub
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sarphare-khekdewala.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Add Environment Variables:
     ```
     DATABASE_URL=your_mongodb_connection_string
     NEXTAUTH_SECRET=your_secret_key
     NEXTAUTH_URL=https://yourdomain.com
     RAZORPAY_KEY_ID=your_razorpay_key
     RAZORPAY_KEY_SECRET=your_razorpay_secret
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=your_email
     EMAIL_PASSWORD=your_app_password
     EMAIL_FROM=Sarphare Khekdewala <noreply@yourdomain.com>
     ADMIN_EMAIL=admin@yourdomain.com
     ADMIN_PASSWORD=your_secure_password
     ```
   - Click "Deploy"

4. **Add Custom Domain**
   - In Vercel Dashboard > Settings > Domains
   - Add your domain (e.g., sarpharekhekdewala.com)
   - Update DNS records as instructed:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21

     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

**Cost:** FREE (Vercel Hobby Plan)
- Unlimited bandwidth
- Automatic SSL
- Edge Network (Fast globally)

---

### Option 2: Netlify (Alternative)

Similar to Vercel:
1. Push to GitHub
2. Connect to Netlify
3. Add environment variables
4. Deploy
5. Add custom domain

**Cost:** FREE

---

### Option 3: AWS / DigitalOcean (More Control)

For more control but requires management:
- AWS Amplify
- DigitalOcean App Platform
- Cost: ~$5-10/month

---

## Domain Setup

### Where to Buy Domain:
1. **GoDaddy** - ₹99-799/year
2. **Namecheap** - $8-12/year
3. **Google Domains** - ₹800-1200/year
4. **Hostinger** - ₹149-499/year (Often has discounts)

### Recommended Domains:
- sarpharekhekdewala.com
- khekdewala.com
- freshcrabsmumbai.com
- bhandupseafood.com

---

## Pre-Deployment Checklist

### 1. Security
- [ ] Change NEXTAUTH_SECRET to a strong random string
- [ ] Change default admin password
- [ ] Update email credentials
- [ ] Add Razorpay production keys

### 2. Database
- [ ] Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0 (or Vercel IPs)
- [ ] Backup your database
- [ ] Test connection from production

### 3. Environment Variables
- [ ] All .env variables set in Vercel
- [ ] NEXTAUTH_URL points to production domain
- [ ] EMAIL_FROM uses your domain

### 4. Testing
- [ ] Test order flow
- [ ] Test payment integration (Razorpay in live mode)
- [ ] Test admin login
- [ ] Test on mobile devices

---

## Monitoring & Scaling

### Free Tier Limitations:
- MongoDB Atlas: 512 MB storage
- Vercel: 100 GB bandwidth/month
- Vercel: 100 executions/hour (serverless functions)

### When to Upgrade:

**MongoDB Atlas ($9/month - M2 Shared Cluster):**
- If storage exceeds 400 MB
- If you need daily backups
- If you want better performance

**Vercel Pro ($20/month):**
- If bandwidth exceeds 100 GB/month
- If you need team collaboration
- If you need password protection

---

## Performance Optimization Tips

1. **Enable Prisma Connection Pooling**
2. **Use MongoDB Indexes** (Already added)
3. **Optimize Images** (Already using Next.js Image)
4. **Enable Vercel Analytics** (Free monitoring)

---

## Support & Maintenance

### Regular Tasks:
- Weekly: Check order status, respond to customers
- Monthly: Review analytics, update products
- Quarterly: Database backup, security audit

### Cost Estimate for 100 orders/day:
- Domain: ₹500/year
- MongoDB: FREE (upgradable to ₹700/month)
- Hosting (Vercel): FREE
- Payment Gateway: 2% transaction fee
- **Total: ~₹500/year** (excluding transaction fees)

---

## Quick Deploy Commands

```bash
# 1. Generate secret key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Test build locally
npm run build

# 3. Test production mode locally
npm start

# 4. Deploy to Vercel (after setup)
vercel --prod
```

---

## Need Help?
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Next.js Docs: https://nextjs.org/docs
