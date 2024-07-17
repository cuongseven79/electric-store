import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';
import { db } from '@/lib/db';
import { getToken } from 'next-auth/jwt';
import { getUserSession } from '@/lib/session';
const creationReq = z.object({
  name: z.string().min(2),
  description: z.string(),
  price: z.number().gte(0),
  quantity: z.number().gte(0),
  categoryId: z.number(),
  images: z.string().array(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = creationReq.parse(body);
    const resp = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        categoryId: data.categoryId,
        assets: {
          createMany: { data: data.images.map((url) => ({ url: url })) },
        },
      },
    });
    return NextResponse.json(resp);
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

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const list = await db.product.findMany({
      include: { assets: true, category: true },
    });
    return NextResponse.json(list);
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
