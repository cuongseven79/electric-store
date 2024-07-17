import { NextResponse, type NextRequest } from 'next/server';
import { hashPassword } from '@/lib/utils';
import { db } from '@/lib/db';
import { ZodError, z } from 'zod';

export async function GET(req: NextRequest) {
  const data = await db.user.findMany();
  const count = await db.user.count();
  return NextResponse.json({
    data: data,
    totalPages: count,
  });
}
