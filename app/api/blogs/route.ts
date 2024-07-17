import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';
import { db } from '@/lib/db';

const creationReq = z.object({
  title: z.string(),
  content: z.string(),
  tagName: z.string().nonempty(),
  productId: z.number().optional(),
  imageUrl: z.string().optional(),
  authorId: z.number().gte(0),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = creationReq.parse(body);
    const resp = await db.blog.create({
      data: {
        title: data.title,
        content: data.content,
        tagName: data.tagName,
        authorId: data.authorId,
        productId: data.productId,
        imageUrl: data.imageUrl,
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

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const list = await db.blog.findMany({
      include: {
        author: true,
        product: true,
      },
    });
    return NextResponse.json({ data: list });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
