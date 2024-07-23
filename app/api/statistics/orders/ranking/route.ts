import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const data = await db.$transaction(async (tx) => {
    const items = await tx.order.groupBy({
      by: 'userId',
      _sum: {
        total: true,
      },
      where: {
        status: {
          in: ['Done', 'Paid'],
        },
      },
      orderBy: {
        _sum: {
          total: 'desc',
        },
      },
      take: 10,
    });

    return await Promise.all(
      items.map(async (v) => {
        const user = await tx.user.findFirst({
          where: { id: v.userId },
        });
        return { total: v._sum.total, user };
      }),
    );
  });

  return NextResponse.json({
    data,
  });
}
