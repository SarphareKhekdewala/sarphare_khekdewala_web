import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  console.log('👤 Creating admin user...');
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sarpharekhekdewala.com' },
    update: {},
    create: {
      email: 'admin@sarpharekhekdewala.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Add delivery areas
  console.log('🚚 Adding delivery areas...');
  await prisma.deliveryArea.deleteMany({});
  
  const deliveryAreas = [
    { area: 'Bhandup', charge: 50 },
    { area: 'Nahur', charge: 70 },
    { area: 'Mulund', charge: 80 },
    { area: 'Kanjurmarg', charge: 80 },
    { area: 'Vikhroli', charge: 90 },
    { area: 'Powai', charge: 100 },
    { area: 'Ghatkopar', charge: 100 },
    { area: 'Kurla', charge: 120 },
    { area: 'Sion', charge: 140 },
    { area: 'Matunga', charge: 140 },
    { area: 'Dadar', charge: 150 },
    { area: 'Byculla', charge: 170 },
    { area: 'Thane', charge: 150 },
    { area: 'Brahmand', charge: 170 },
    { area: 'Pokhran', charge: 170 },
    { area: 'Kolshet', charge: 170 },
    { area: 'Ghodbunder Road', charge: 180 },
    { area: 'Kalwa', charge: 170 },
    { area: 'Mumbra', charge: 180 },
    { area: 'Dombivli', charge: 220 },
    { area: 'Kalyan', charge: 250 },
    { area: 'Khadakpada', charge: 250 },
    { area: 'MIDC', charge: 250 },
    { area: 'Nandgaon', charge: 250 },
    { area: 'Ambernath', charge: 270 },
    { area: 'Titwala', charge: 270 },
    { area: 'Dombivali Palava', charge: 300 },
    { area: 'Badlapur', charge: 300 },
    { area: 'Girgaon', charge: 240 },
    { area: 'Aagripada Santacruz', charge: 250 },
    { area: 'Bandra', charge: 170 },
    { area: 'Khar', charge: 180 },
    { area: 'Santacruz', charge: 170 },
    { area: 'Vile Parle', charge: 180 },
    { area: 'Andheri', charge: 180 },
    { area: 'Jogeshwari', charge: 170 },
    { area: 'Goregaon', charge: 150 },
    { area: 'Malad', charge: 180 },
    { area: 'Kandivali', charge: 200 },
    { area: 'Borivali', charge: 220 },
    { area: 'Dahisar', charge: 240 },
    { area: 'Mira Road', charge: 250 },
    { area: 'Bhayandar', charge: 250 },
    { area: 'Vasai', charge: 300 },
    { area: 'Nalasopara', charge: 320 },
    { area: 'Virar', charge: 350 },
    { area: 'Churchgate', charge: 200 },
    { area: 'Chembur', charge: 140 },
    { area: 'Seawoods', charge: 210 },
    { area: 'Belapur', charge: 230 },
    { area: 'Kharghar', charge: 240 },
    { area: 'Panvel', charge: 300 },
    { area: 'Airoli', charge: 100 },
    { area: 'Rabale', charge: 140 },
    { area: 'Ghansoli', charge: 150 },
    { area: 'Koparkhairane', charge: 160 },
    { area: 'Turbhe', charge: 180 },
    { area: 'Vashi', charge: 200 },
    { area: 'Sanpada', charge: 220 },
    { area: 'Nerul', charge: 240 },
  ];

  for (const area of deliveryAreas) {
    await prisma.deliveryArea.create({ data: area });
  }
  console.log(`✅ Added ${deliveryAreas.length} delivery areas`);

  // Create actual products
  console.log('🦀 Creating products...');
  
  const products = [
    // Black Crabs
    {
      name: 'Black Crab - Medium (6-7 crabs)',
      nameMarathi: 'काळा खेकडा - मध्यम',
      category: 'Black Crabs',
      price: 750,
      unit: 'kg',
      description: 'Fresh black crabs, medium size (6-7 crabs per kg). Perfect for curry and steaming.',
      stock: 50,
      available: true,
      image: '/images/black-crab-medium.jpg',
    },
    {
      name: 'Black Crab - Big (5 crabs)',
      nameMarathi: 'काळा खेकडा - मोठा',
      category: 'Black Crabs',
      price: 800,
      unit: 'kg',
      description: 'Premium black crabs, big size (5 crabs per kg).',
      stock: 40,
      available: true,
      image: '/images/black-crab-big.jpg',
    },
    {
      name: 'Black Crab - Big (4 crabs)',
      nameMarathi: 'काळा खेकडा - अतिमोठा',
      category: 'Black Crabs',
      price: 850,
      unit: 'kg',
      description: 'Extra large black crabs (4 crabs per kg). Premium quality.',
      stock: 35,
      available: true,
      image: '/images/black-crab-xl.jpg',
    },
    {
      name: 'Black Crab - Big (3 crabs)',
      nameMarathi: 'काळा खेकडा - जंबो',
      category: 'Black Crabs',
      price: 900,
      unit: 'kg',
      description: 'Jumbo black crabs (3 crabs per kg). Best quality.',
      stock: 30,
      available: true,
      image: '/images/black-crab-jumbo.jpg',
    },
    {
      name: 'Black Crab - Big (2 crabs)',
      nameMarathi: 'काळा खेकडा - अत्यंत मोठा',
      category: 'Black Crabs',
      price: 1000,
      unit: 'kg',
      description: 'Largest black crabs (2 crabs per kg). Ultimate premium.',
      stock: 25,
      available: true,
      image: '/images/black-crab-xxl.jpg',
    },
    // Green Crabs
    {
      name: 'Green Crab (500g-750g)',
      nameMarathi: 'हिरवा खेकडा - मध्यम',
      category: 'Green Crabs',
      price: 2000,
      unit: 'kg',
      description: 'Fresh green crabs, weight range 500-750 grams. Highly sought after.',
      stock: 20,
      available: true,
      image: '/images/green-crab-medium.jpg',
    },
    {
      name: 'Green Crab (800g-1.5kg)',
      nameMarathi: 'हिरवा खेकडा - मोठा',
      category: 'Green Crabs',
      price: 2800,
      unit: 'kg',
      description: 'Premium large green crabs, weight range 800g-1.5kg. Top quality.',
      stock: 15,
      available: true,
      image: '/images/green-crab-large.jpg',
    },
    // Fish
    {
      name: 'Surmai (5 big slices)',
      nameMarathi: 'सुरमई',
      category: 'Fish',
      price: 1200,
      unit: 'kg',
      description: 'Fresh Surmai fish with 5 big slices per kg. Perfect for frying.',
      stock: 30,
      available: true,
      image: '/images/surmai.jpg',
    },
    {
      name: 'Pomfret (3 pomfret)',
      nameMarathi: 'पापलेट',
      category: 'Fish',
      price: 1600,
      unit: 'kg',
      description: 'Premium pomfret fish, 3 pieces per kg. Excellent for steaming.',
      stock: 25,
      available: true,
      image: '/images/pomfret.jpg',
    },
    {
      name: 'Bombil (8-10 pieces)',
      nameMarathi: 'बोंबील',
      category: 'Fish',
      price: 450,
      unit: 'kg',
      description: 'Fresh Bombil (Bombay Duck), 8-10 pieces per kg. Mumbai specialty.',
      stock: 40,
      available: true,
      image: '/images/bombil.jpg',
    },
    // Prawns & Lobsters
    {
      name: 'Jumbo Prawns (17-18 prawns)',
      nameMarathi: 'जांबो कोळंबी',
      category: 'Prawns',
      price: 850,
      unit: 'kg',
      description: 'Large jumbo prawns, 17-18 pieces per kg. Fresh and cleaned.',
      stock: 35,
      available: true,
      image: '/images/jumbo-prawns.jpg',
    },
    {
      name: 'Lobsters Small (200g-300g, 5-6 pieces)',
      nameMarathi: 'लॉबस्टर - लहान',
      category: 'Lobsters',
      price: 2200,
      unit: 'kg',
      description: 'Fresh lobsters, weight 200-300g each, 5-6 pieces per kg.',
      stock: 10,
      available: true,
      image: '/images/lobster-small.jpg',
    },
    {
      name: 'Lobsters Large (350g-500g, 2-4 pieces)',
      nameMarathi: 'लॉबस्टर - मोठा',
      category: 'Lobsters',
      price: 2500,
      unit: 'kg',
      description: 'Premium large lobsters, weight 350-500g each, 2-4 pieces per kg.',
      stock: 8,
      available: true,
      image: '/images/lobster-large.jpg',
    },
  ];

  // Clear existing products first
  await prisma.product.deleteMany({});
  
  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log('✅ Product created:', created.name);
  }

  console.log('🎉 Seeding completed successfully!');
  console.log('\n📝 Admin Login Credentials:');
  console.log('Email: admin@sarpharekhekdewala.com');
  console.log('Password: Admin@123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
