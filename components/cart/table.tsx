'use client';
import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { Poppins, Playfair_Display } from 'next/font/google';
import {
  Button,
  Empty,
  Input,
  InputNumber,
  Radio,
  Collapse,
  Form,
  Table,
  Space,
} from 'antd';
import api from '@/lib/api';

import { useForm } from 'antd/es/form/Form';
import { ICartItem, IProduct } from '@/lib/definitions';
import { useCart } from '@/contexts/cart';
import { Footer } from '../footer';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { VND } from '@/lib/currency';
import { useRouter } from 'next/navigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const paymentMethods = [
  {
    key: 'vnpay',
    value: 'VNPay',
    image: 'https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo.svg',
  },
  // {
  //   key: 'paypal',
  //   value: 'Paypal',
  //   image: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
  // },
];

const columns = ({
  handleRemove,
  setQuantity,
}: {
  handleRemove: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
}) => [
  {
    width: 10,
    render: (item: ICartItem) => (
      <Button
        icon={<CloseOutlined />}
        type="text"
        danger
        onClick={() => handleRemove(item.productId)}
      />
    ),
  },
  {
    render: ({ product }: ICartItem) => (
      <div className="flex flex-row items-center gap-2">
        <img
          src={(product?.assets && product.assets[0].url) || ''}
          className="h-[50px] w-[50px] object-cover"
        />
        <div className="flex flex-1 flex-col justify-between">
          <div className="text-sm">{product?.name}</div>
        </div>
      </div>
    ),
  },
  {
    render: (item: ICartItem) => (
      <Space>
        <div>{VND(item.product?.price || 0).format()} x </div>
        <InputNumber
          defaultValue={1}
          value={item.quantity}
          onChange={(v) => setQuantity(item.productId, v || 1)}
          max={item.product?.quantity}
        />
        <div>= {VND((item.product?.price || 0) * item.quantity).format()}</div>
      </Space>
    ),
  },
];

export default function CartTable() {
  const [form] = useForm();
  const { cart, addCart, removeCart, setQuantity, getQuantity, total } =
    useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const { paymentUrl } = await api(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify({ ...values, items: cart }),
      });
      // Open new tab
      router.replace(paymentUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ ...session?.user, fullname: session?.user.name });
  }, [session]);

  return (
    <main className="flex w-full min-w-0 flex-row gap-5">
      <div className="flex flex-1 flex-col items-stretch">
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          initialValues={session?.user || {}}
        >
          <Form.Item
            name="fullname"
            label="Full name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email addresss">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phonenumber"
            label="Phone number"
            rules={[
              { min: 10, max: 14, required: true },
              {
                pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                message: 'Please enter a valid  phone number',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Shipping adress"
            rules={[{ required: true, min: 5 }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="paymentMethod">
            <Radio.Group>
              {paymentMethods.map((method, index) => (
                <Radio value={method.key}>
                  <div className="flex h-[100px] w-[100px] flex-col items-center justify-center">
                    <img src={method.image} width={100} height={100} />
                    <p>{method.value}</p>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <button
            className="mx-auto mt-2 bg-[black] px-[50px] py-1 text-sm text-white"
            type="submit"
          >
            Pay
          </button>
        </Form>
      </div>
      <div className="flex flex-1 flex-col gap-3 bg-gray-50 p-4">
        <span className="font-normal">Order summary ({cart.length})</span>
        <div className="w-full border border-gray-200" />
        {cart.length == 0 ? (
          <Empty />
        ) : (
          cart.map((item: ICartItem) => (
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
                        <div className="text-green-500 text-[0.9rem]">
                          {item.quantity} x{' '}
                        </div>
                      )}
                      {VND(item.product?.price).format()}
                    </div>
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty. {item.quantity}</span>
                  <span
                    className="text-blue-500 hover:cursor-pointer"
                    onClick={() => removeCart(item.productId)}
                  >
                    Remove
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="w-full border border-gray-200" />
        <div className="flex items-center justify-between font-normal">
          <span className="">Total</span>
          <span className="">{VND(total).format()}</span>
        </div>
      </div>
    </main>
  );
}
