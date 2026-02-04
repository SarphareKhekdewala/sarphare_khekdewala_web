import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('👤 Creating admin user...');

  // Get credentials from environment variables or command line
  const email = process.env.ADMIN_EMAIL || process.argv[2] || 'admin@sarpharekhekdewala.com';
  const password = process.env.ADMIN_PASSWORD || process.argv[3];
  const name = 'Admin';

  if (!password) {
    console.error('❌ Error: Password is required!');
    console.log('\nUsage:');
    console.log('  npx tsx scripts/create-admin.ts <email> <password>');
    console.log('\nOr set environment variables:');
    console.log('  $env:ADMIN_EMAIL="your-email@example.com"; $env:ADMIN_PASSWORD="YourSecurePassword"; npx tsx scripts/create-admin.ts');
    process.exit(1);
  }

  // Validate password strength
  if (password.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters long');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name,
      role: 'ADMIN',
    },
    create: {
      email,
      name,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created successfully!');
  console.log('\n📝 Login Credentials:');
  console.log('Email:', email);
  console.log('Password: ********** (hidden for security)');
  console.log('\n🔗 Login URL: http://localhost:3000/admin/login');
  console.log('\n⚠️  IMPORTANT: Save these credentials securely and delete this script after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
