import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ZodError, z } from 'zod';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const staff = await db.product.findFirst({
      where: {
        id: parseInt(params.slug),
      },
      include: {
        assets: true,
        category: true,
        blogs: true,
        feedbacks: {
          orderBy: {
            id: 'desc',
          },
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(staff);
  } catch (e) {
    return NextResponse.json(
      { message: 'Product is not found' },
      { status: 404 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const productId = parseInt(params.slug);
    await db.productAsset.deleteMany({ where: { productId: productId } });
    const staff = await db.product.delete({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(staff);
  } catch (e) {
    return NextResponse.json(
      { message: 'Product is not found' },
      { status: 404 },
    );
  }
}

const updateReq = z.object({
  name: z.string().min(2),
  description: z.string(),
  price: z.number().gte(0),
  quantity: z.number().gte(0),
  categoryId: z.number(),
  images: z.string().array(),
});
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const productId = parseInt(params.slug);
    const body = await req.json();
    const data = updateReq.parse(body);
    await db.productAsset.deleteMany({
      where: { productId: productId },
    });
    const resp = await db.product.update({
      where: { id: productId },
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
