import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay, startOfMonth, endOfMonth, subDays, format } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Total orders
    const totalOrders = await prisma.order.count();

    // Total revenue
    const allOrders = await prisma.order.findMany({
      where: { paymentStatus: 'paid' },
      select: { finalAmount: true },
    });
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.finalAmount, 0);

    // Pending orders
    const pendingOrders = await prisma.order.count({
      where: { status: { in: ['pending', 'confirmed', 'processing'] } },
    });

    // Delivered orders
    const deliveredOrders = await prisma.order.count({
      where: { status: 'delivered' },
    });

    // Today's orders
    const todayOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    // Today's revenue
    const todayOrdersData = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
        paymentStatus: 'paid',
      },
      select: { finalAmount: true },
    });
    const todayRevenue = todayOrdersData.reduce((sum, order) => sum + order.finalAmount, 0);

    // Month's revenue
    const monthOrdersData = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        paymentStatus: 'paid',
      },
      select: { finalAmount: true },
    });
    const monthRevenue = monthOrdersData.reduce((sum, order) => sum + order.finalAmount, 0);

    // Last 7 days data for charts
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(now, i);
      const dayStart = startOfDay(date);
      const dayEnd = endOfDay(date);

      const dayOrders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
          paymentStatus: 'paid',
        },
        select: { finalAmount: true },
      });

      const dayRevenue = dayOrders.reduce((sum, order) => sum + order.finalAmount, 0);

      last7Days.push({
        date: format(date, 'MMM dd'),
        orders: dayOrders.length,
        revenue: dayRevenue,
      });
    }

    // Order status distribution
    const statusCounts = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const ordersByStatus = statusCounts.map((item) => ({
      status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      count: item._count.status,
    }));

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      todayOrders,
      todayRevenue,
      monthRevenue,
      last7Days,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
