import { NextResponse, type NextRequest } from 'next/server';
import { Category, addCategory, listCatories } from '@/lib/data/category';
import { z } from 'zod';
import { db } from '@/lib/db';

const creationReq = z.object({
  name: z.string().min(2),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const category = creationReq.parse(body);
    const existed = await db.category.findFirst({
      where: {
        name: category.name,
      },
    });
    if (existed) {
      return NextResponse.json(
        { message: 'Category is used, please choose another name' },
        { status: 400 },
      );
    }
    const data = await db.category.create({
      data: {
        name: category.name,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const data = await db.category.findMany({});
    return NextResponse.json({ data });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
