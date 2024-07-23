import { error } from 'console';
import { NextResponse, type NextRequest } from 'next/server';
import dayjs from 'dayjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { create } from 'domain';

export async function GET(req: NextRequest) {
  try {
    const list = await db.order.findMany({
      where: {
        status: {
          in: ['Paid', 'Done'],
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({ data: list });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}
const creationReq = z.object({
  items: z
    .object({ productId: z.number(), quantity: z.number().gt(0) })
    .array(),
  paymentMethod: z.enum(['vnpay', 'paypal']),
  email: z.string(),
  address: z.string(),
  phonenumber: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = creationReq.parse(body);

    let totalAmount: number = 0;
    // Check quantity and update item
    //
    let paymentUrl: string = '';
    await db.$transaction(async (tx) => {
      // Find user by email
      const user = await tx.user.findFirst({
        where: { email: data.email },
      });
      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 400 },
        );
      }

      let paymentId = new Date().getTime();
      let order = await tx.order.create({
        data: {
          total: 0,
          status: 'Pending',
          paymentMethod: data.paymentMethod,
          paymentId: `${paymentId}`,
          userId: user?.id,
          address: data.address,
          phone: data.phonenumber,
        },
      });

      // Find product and check quantity then create order item by order id
      await Promise.all(
        data.items.map(async (item) => {
          try {
            const product = await tx.product.findFirst({
              where: { id: item.productId },
            });
            if (!product) throw new Error('Product is not found');
            if (product?.quantity < item.quantity)
              throw new Error('Product is sold out');
            // create order items
            //
            await tx.product.update({
              where: { id: product.id },
              data: { quantity: { decrement: item.quantity } },
            });
            await tx.orderItem.create({
              data: {
                orderId: order.id,
                productId: product.id,
                price: product.price,
                quantity: item.quantity,
              },
            });
            // update total amount
            totalAmount += product.price * item.quantity;
          } catch (err) {
            throw err;
          }
        }),
      );

      order = await tx.order.update({
        where: { id: order.id },
        data: { total: totalAmount },
      });

      switch (data.paymentMethod) {
        case 'vnpay':
          paymentUrl = requestVNPay(req, {
            order_id: order?.paymentId,
            amount: order?.total,
          });
      }
    });

    return NextResponse.json({ paymentUrl: paymentUrl });
  } catch (e) {
    return NextResponse.json({ message: JSON.stringify(e) }, { status: 400 });
  }
}

function requestVNPay(
  req: NextRequest,
  data: {
    order_id: string;
    amount: number;
  },
): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(/, /)[0] : req.ip;

  var tmnCode = 'IZPDB78I';
  var secretKey = '3616E0F2VCB0PAJQLAUTBOZLBB80JQJ8';
  var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  var returnUrl = process.env.NEXT_PUBLIC_API_URL + '/api/orders/result';

  var createDate = dayjs().format('YYYYMMDDHHmmss');
  var orderId = data.order_id || dayjs().format('HHmmss');
  var amount = data.amount;
  var bankCode = '';

  var orderInfo = `Thanh toan hoa don ${orderId}`;
  var orderType = '120000';
  var locale = 'vn';
  if (locale === null || locale === '') {
    locale = 'vn';
  }
  var currCode = 'VND';
  var vnp_Params: { [key: string]: any } = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ip;
  vnp_Params['vnp_CreateDate'] = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = Object.keys(vnp_Params)
    .sort()
    .reduce(function (acc: { [key: string]: any }, key) {
      acc[key] = vnp_Params[key];
      return acc;
    }, {});

  var signData = new URLSearchParams(vnp_Params).toString();
  var crypto = require('crypto');
  var hmac = crypto.createHmac('sha512', secretKey);
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + new URLSearchParams(vnp_Params).toString();
  return vnpUrl;
}
