import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const data = await db.category.findFirst({
      where: { id: parseInt(params.slug) },
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    await db.category.delete({
      where: { id: parseInt(params.slug) },
    });
    return NextResponse.json({ message: 'Category is deleted' });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}


const updateReq = z.object({
  name: z.string().min(2),
});

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } },
){
  try {
    const body = await req.json();
    const category =updateReq.parse(body);
    const data = await db.category.update({
      where: { id: parseInt(params.slug) },
      data: {
        name: category.name,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}