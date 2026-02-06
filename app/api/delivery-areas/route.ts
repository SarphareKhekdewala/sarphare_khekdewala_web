import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const areas = await prisma.deliveryArea.findMany({
      orderBy: {
        area: 'asc',
      },
    });

    return NextResponse.json(areas);
  } catch (error) {
    console.error('Error fetching delivery areas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch delivery areas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { area, charge } = await request.json();

    const newArea = await prisma.deliveryArea.create({
      data: {
        area,
        charge,
      },
    });

    return NextResponse.json(newArea);
  } catch (error) {
    console.error('Error creating delivery area:', error);
    return NextResponse.json(
      { error: 'Failed to create delivery area' },
      { status: 500 }
    );
  }
}
