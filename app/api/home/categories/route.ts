import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const data = await db.$transaction(
      async (tx) => {
        const categories = await tx.category.findMany({});
        const data = await Promise.all(
          categories.map(async (v) => {
            const product = await tx.product.findFirst({
              where: {
                categoryId: v.id,
              },
              include: {
                assets: true,
              },
            });
            return { ...v, product };
          }),
        );
        return data;
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      },
    );
    return NextResponse.json({ data: data.filter((v) => v.product) });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) });
  }
}
