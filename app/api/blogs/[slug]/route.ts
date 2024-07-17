import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ZodError, z } from 'zod';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const staff = await db.blog.findFirst({
      where: {
        id: parseInt(params.slug),
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
    const id = parseInt(params.slug);
    const staff = await db.blog.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(staff);
  } catch (e) {
    return NextResponse.json({ message: 'Blog is not found' }, { status: 404 });
  }
}

const updateReq = z.object({
  title: z.string(),
  content: z.string(),
  tagName: z.string().nonempty(),
  productId: z.number().optional(),
  imageUrl: z.string().optional(),
  authorId: z.number().gte(0),
});
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const blogId = parseInt(params.slug);
    const body = await req.json();
    const data = updateReq.parse(body);

    const resp = await db.blog.update({
      where: { id: blogId },
      data: {
        title: data.title,
        content: data.content,
        tagName: data.tagName,
        authorId: data.authorId,
        productId: data.productId || null,
        imageUrl: data.imageUrl || null,
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
