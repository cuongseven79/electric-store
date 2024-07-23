import { NextResponse, type NextRequest } from 'next/server';
import { hashPassword } from '@/lib/utils';
import { db } from '@/lib/db';
import { ZodError, z } from 'zod';

const createUserReq = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = createUserReq.parse(body);
    const existed = await db.staff.findFirst({
      where: {
        email: user.email,
      },
    });
    if (existed) {
      return NextResponse.json(
        { message: 'Staff is existed' },
        { status: 400 },
      );
    }
    const data = await db.staff.create({
      data: {
        fullname: user.fullname,
        email: user.email,
        password: hashPassword(user.password),
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const l = parseInt(params.get('l') || '10');
  const p = parseInt(params.get('p') || '0');
  const staffs = await db.staff.findMany({ take: l, skip: p * l });
  const count = await db.staff.count();
  return NextResponse.json({
    data: staffs,
    totalPages: count,
  });
}
