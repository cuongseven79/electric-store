import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const remaining = await db.product.aggregate({
    _sum: {
      quantity: true,
    },
  });

  const sold = await db.orderItem.aggregate({
    _sum: {
      quantity: true,
    },
  });

  const today = await db.orderItem.aggregate({
    where: {
      createdAt: {
        gte: new Date(),
      },
    },
    _sum: {
      quantity: true,
    },
  });

  return NextResponse.json({
    remaining: remaining._sum.quantity,
    sold: sold._sum.quantity,
    today: today._sum.quantity || 0,
  });
}
