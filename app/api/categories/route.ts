import { error } from 'console';
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
    let pars = req.nextUrl.searchParams;
    const page = pars.get('page') || '0';

    const list = await db.category.findMany({});
    const total = await db.category.count();
    return NextResponse.json({ data: list, total: Math.ceil(total / 4) });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
