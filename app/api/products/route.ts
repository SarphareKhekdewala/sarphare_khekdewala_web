import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterCategory = searchParams.get('category');

    let where: any = { available: true };

    // Map filter categories to actual database categories
    if (filterCategory === 'mud-crabs') {
      where.category = { in: ['Black Crabs', 'Green Crabs'] };
    } else if (filterCategory === 'fresh-fish') {
      where.category = { in: ['Fish', 'Prawns', 'Lobsters'] };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nameMarathi, category, description, price, unit, image, stock } = body;

    const product = await prisma.product.create({
      data: {
        name,
        nameMarathi,
        category,
        description,
        price: parseFloat(price),
        unit,
        image,
        stock: parseInt(stock),
        available: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
