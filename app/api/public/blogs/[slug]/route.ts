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
