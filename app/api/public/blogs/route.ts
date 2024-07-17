import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const list = await db.blog.findMany({
      where: { tagName: 'blog' },
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
