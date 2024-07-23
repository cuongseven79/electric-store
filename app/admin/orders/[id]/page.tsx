import api from '@/lib/api';
import {
  BoxPlotOutlined,
  CreditCardOutlined,
  DropboxOutlined,
  LoadingOutlined,
  MoneyCollectOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';
import { Input, Radio, Form, Avatar } from 'antd';
import {
  ICartItem,
  IOrder,
  IOrderItem,
  IProduct,
  IUser,
} from '@/lib/definitions';
import { VND } from '@/lib/currency';
import { MarkShippedButton } from '@/components/orders/button';

const paymentMethods = [
  {
    key: 'vnpay',
    value: 'VNPay',
    image: 'https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg',
  },
  {
    key: 'paypal',
    value: 'Paypal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
  },
];

const statusMap = {
  Pending: {
    current: 1,
    status: 'wait',
  },
  Expired: {
    current: 1,
    status: 'error',
  },
  Paid: {
    current: 2,
    status: 'process',
  },
  Done: {
    current: 3,
    status: 'done',
  },
};
export default async function Page({ params }: { params: { id: string } }) {
  const order = (await getOrder(params.id)) as IOrder;
  const { items, user }: { items: IOrderItem[]; user: IUser } = order;
  return (
    <main className="flex w-full min-w-0 flex-col items-center gap-6">
      <div className="w-[80%]">
        <Steps
          {...statusMap[order.status]}
          items={[
            {
              title: 'Checkout',
              icon: <ShoppingCartOutlined />,
            },
            {
              title: 'Pay',
              icon: <CreditCardOutlined />,
            },
            {
              title: 'Ship',
              icon: <ThunderboltOutlined />,
            },
            {
              title: 'Done',
              icon: <SmileOutlined />,
            },
          ]}
        />
      </div>

      <div className="flex w-full min-w-0 flex-row items-start gap-5">
        <div className="flex flex-1 flex-col items-stretch">
          <div className="flex flex-col items-center justify-center font-semibold uppercase">
            <Avatar src={user.image} size={100} />
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>

          <div className="mt-10 font-semibold uppercase">
            Payment Information
          </div>
          <div className="w-full border border-gray-200" />
          <div className="mt-1 flex flex-row justify-between">
            <div>Ordered At</div>
            <div>{order.createdAt}</div>
          </div>
          <div className="mt-1 flex flex-row justify-between">
            <div>Paid At</div>
            <div>{order.createdAt}</div>
          </div>
          <div className="mt-1 flex flex-row justify-between">
            <div>Payment method</div>
            <div className="uppercase">{order.paymentMethod}</div>
          </div>
          <div className="mt-1 flex flex-row justify-between">
            <div>Payment ID</div>
            <div className="uppercase">{order.paymentId}</div>
          </div>

          <div className="mt-10 font-semibold uppercase">
            Shipping Information
          </div>
          <div className="w-full border border-gray-200" />
          <div className="mt-1 flex flex-row justify-between">
            <div>Phone number</div>
            <div>{order.phone}</div>
          </div>
          <div className="mt-1 flex flex-row justify-between">
            <div>Address</div>
            <div className="uppercase">{order.address}</div>
          </div>
        </div>

        <div className="flex min-h-[30vh] flex-1 flex-col gap-3 bg-gray-50 p-4 ">
          <span className="font-normal">Order summary ({items?.length})</span>
          <div className="w-full border border-gray-200" />
          {items?.map((item: IOrderItem) => (
            <div
              className="flex items-center justify-center gap-4"
              key={item.productId}
            >
              {item.product?.assets && (
                <img
                  src={item.product.assets[0].url}
                  alt=""
                  className="h-[80px] w-[80px] rounded-md object-cover"
                />
              )}
              <div className="flex w-full flex-col justify-between">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">{item.product?.name}</h3>
                    <div className="flex items-center gap-2 rounded-sm bg-gray-50 p-1">
                      {item.quantity && item.quantity > 1 && (
                        <div className="text-green-500 text-xs">
                          {item.quantity} x{' '}
                        </div>
                      )}
                      ${item.price}
                    </div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm text-gray-500">
                    {item.product?.description}
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full border border-gray-200" />
          <div className="flex items-center justify-between font-normal">
            <span className="">Total</span>
            <span className="">{VND(order.total).format()}</span>
          </div>
        </div>
      </div>
      {order.status === 'Paid' && <MarkShippedButton id={order.id} />}
    </main>
  );
}

async function getOrder(id: string): IOrder | any {
  try {
    const response = await api(`/api/orders/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
