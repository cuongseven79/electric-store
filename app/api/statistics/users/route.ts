import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const total = await db.user.count();
  const today = await db.user.count({
    where: {
      createdAt: {
        gte: new Date(),
      },
    },
  });
  return NextResponse.json({
    total,
    today,
  });
}
