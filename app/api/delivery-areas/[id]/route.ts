import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { area, charge } = await request.json();

    const updatedArea = await prisma.deliveryArea.update({
      where: { id: params.id },
      data: {
        area,
        charge,
      },
    });

    return NextResponse.json(updatedArea);
  } catch (error) {
    console.error('Error updating delivery area:', error);
    return NextResponse.json(
      { error: 'Failed to update delivery area' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.deliveryArea.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting delivery area:', error);
    return NextResponse.json(
      { error: 'Failed to delete delivery area' },
      { status: 500 }
    );
  }
}
