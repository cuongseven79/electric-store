import { error } from 'console';
import { NextResponse, type NextRequest } from 'next/server';
import dayjs from 'dayjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { create } from 'domain';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const list = await db.order.findMany({
      where: { userId: session?.user.id || '' },
      include: {
        items: {
          include: {
            product: {
              include: {
                assets: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ data: list });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
