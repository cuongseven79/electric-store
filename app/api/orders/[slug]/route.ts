import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ZodError, z } from 'zod';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const order = await db.order.findFirst({
      where: {
        id: parseInt(params.slug),
      },
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
        user: true,
      },
    });
    return NextResponse.json(order);
  } catch (e) {
    return NextResponse.json(
      { message: 'Product is not found' },
      { status: 404 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const orderId = parseInt(params.slug);
    const resp = await db.order.update({
      where: { id: orderId },
      data: {
        status: 'Done',
      },
    });
    return NextResponse.json(resp);
  } catch (e) {
    console.log(e);
    if (e instanceof ZodError) {
      return NextResponse.json(
        { message: JSON.stringify(e.issues) },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
