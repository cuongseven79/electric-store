import { NextResponse, type NextRequest } from 'next/server';
import { list } from 'postcss';
import { hashPassword } from '@/lib/utils';
import { z } from 'zod';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const data = await db.user.findFirst({
      where: {
        id: params.slug,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { message: 'Staff is not found' },
      { status: 404 },
    );
  }
}

const updateStaffReq = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(4),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const body = await req.json();
    const staff = updateStaffReq.parse(body);
    const data = await db.staff.update({
      where: {
        id: parseInt(params.slug),
      },
      data: {
        fullname: staff.fullname,
        email: staff.email,
        password: hashPassword(staff.password),
      },
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
    await db.staff.delete({ where: { id: parseInt(params.slug) } });
    return NextResponse.json({ message: 'Staff is deleted' });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
