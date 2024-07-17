import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  const byDate = await db.$queryRaw(Prisma.sql`SELECT
	DATE("createdAt"),
	sum(total)
FROM
	"Order"
WHERE
	status IN('Paid', 'Done') AND date("createdAt") > current_date - interval '7 days'
GROUP BY
	date("createdAt") order by date("createdAt");`);
  return NextResponse.json({
    byDate,
  });
}
