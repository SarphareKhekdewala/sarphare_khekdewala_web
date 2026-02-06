import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber, calculateDeliveryCharge } from '@/lib/utils';
import { sendOrderConfirmation } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    let where: any = {};
    
    if (status) {
      where.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      where.createdAt = {
        gte: startDate,
        lt: endDate,
      };
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer, items, deliveryCharge, notes } = body;

    // Calculate totals
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + item.total,
      0
    );
    const finalAmount = totalAmount + (deliveryCharge || 0);

    // Create or find customer
    let customerRecord = await prisma.customer.findUnique({
      where: { phone: customer.phone },
    });

    if (!customerRecord) {
      customerRecord = await prisma.customer.create({
        data: customer,
      });
    } else {
      // Update customer details
      customerRecord = await prisma.customer.update({
        where: { id: customerRecord.id },
        data: customer,
      });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: customerRecord.id,
        totalAmount,
        deliveryCharge: deliveryCharge || 0,
        finalAmount,
        status: 'pending',
        paymentStatus: 'pending',
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
        },
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation(order, customerRecord);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
