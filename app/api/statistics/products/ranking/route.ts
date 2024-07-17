import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const data = await db.$transaction(async (tx) => {
      const items = await tx.$queryRaw`SELECT
	oi."productId",
	sum(quantity)
FROM
	"OrderItem" oi JOIN "Order" o ON oi."orderId" = o.id
WHERE
	status IN('Paid', 'Done')
GROUP BY
	oi."productId"
	order by sum(quantity) desc limit 10;
`;
      const data = await Promise.all(
        items?.map(async (v: { productId: number; sum: number }) => {
          const product = await tx.product.findFirst({
            where: { id: v.productId },
            include: {
              assets: true,
            },
          });
          return { ...v, count: v.sum, product };
        }),
      );
      return data;
    });

    return NextResponse.json({
      data,
    });
  } catch (e) {
    return NextResponse.json({
      message: 'Error when retrieving ranking',
    });
  }
}
