// @ts-nocheck
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';
import { db } from '@/lib/db';
import { comparePassword } from '@/lib/utils';
import { generateToken } from '@/lib/token';

const creationReq = z.object({
  email: z.string().min(2),
  password: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = creationReq.parse(body);
    const user = await db.staff.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error('user not found');
    }
    // Compare hashed password
    const passwordsMatch = comparePassword(data.password, user.password);
    if (!passwordsMatch) {
      throw new Error('password is mismatch');
    }
    user.password = '';
    const accessToken = await generateToken(user);
    return NextResponse.json({
      ...user,
      accessToken,
    });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
