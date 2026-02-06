import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendOrderStatusUpdate } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, paymentStatus, razorpayPaymentId, deliveryDate, deliverySlot } = body;

    const updateData: any = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (razorpayPaymentId) updateData.razorpayPaymentId = razorpayPaymentId;
    if (deliveryDate) updateData.deliveryDate = new Date(deliveryDate);
    if (deliverySlot) updateData.deliverySlot = deliverySlot;

    const order = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Send status update email if status changed
    if (status) {
      try {
        await sendOrderStatusUpdate(order, order.customer, status);
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
