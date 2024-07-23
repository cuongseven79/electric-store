import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const data = Array.from(params.keys()).reduce((prev, key: string) => {
    return { ...prev, [key]: params.get(key) };
  }, {});
  const transactionStatus = params.get('vnp_TransactionStatus');
  const paymentId = params.get('vnp_TxnRef') || '';
  const isSuccess = transactionStatus === '00';

  await db.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: { paymentId: paymentId },
      include: {
        items: true,
      },
    });

    if (!order) {
      // success code
      return NextResponse.json({
        message: 'Order not found',
      });
    }

    if (!isSuccess) {
      // Rollback quantity of product
      await Promise.all(
        order.items.map(async (item) => {
          await tx.product.update({
            where: { id: item.productId },
            data: { quantity: { increment: item.quantity } },
          });
        }),
      );
    }

    await db.order.updateMany({
      where: { paymentId: paymentId },
      data: { status: isSuccess ? 'Paid' : 'Expired' },
    });
  });

  let redirectUrl = '/payment/error';
  if (isSuccess) {
    redirectUrl = '/payment/success';
  }
  redirectUrl = process.env.NEXT_PUBLIC_API_URL + redirectUrl;
  // success code
  return NextResponse.redirect(redirectUrl);
}
