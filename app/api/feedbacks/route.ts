import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';
import { db } from '@/lib/db';

const creationReq = z.object({
  productId: z.number(),
  orderId: z.number(),
  rate: z.number().gte(0).lte(5),
  review: z.string().nonempty(),
  userId: z.string().nonempty(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = creationReq.parse(body);
    await db.$transaction(async (tx) => {
      const fb = await tx.feedBack.create({
        data: {
          rate: data.rate,
          review: data.review,
          userId: data.userId,
          productId: data.productId,
        },
      });
      await tx.orderItem.updateMany({
        where: {
          AND: [
            {
              orderId: data.orderId,
            },
            {
              productId: data.productId,
            },
          ],
        },
        data: {
          feedbackId: fb.id,
        },
      });
    });
    return NextResponse.json({});
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(
        { message: JSON.stringify(e.issues) },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
