import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const total = await db.order.count({
    where: {
      status: {
        notIn: ['Pending', 'Expired'],
      },
    },
  });
  const today = await db.order.count({
    where: {
      createdAt: {
        gte: new Date(),
      },
    },
  });

  const shipping = await db.order.count({
    where: {
      status: 'Paid',
    },
  });

  const done = await db.order.count({
    where: {
      status: 'Done',
    },
  });

  return NextResponse.json({
    total,
    today,
    shipping,
    done,
  });
}
