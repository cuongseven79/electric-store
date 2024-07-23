'use client';
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
import { useCart } from '../../contexts/cart';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

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

export default function OrderDetail() {
  const [form] = useForm();
  const { cart,  total } = useCart();
  const { data: session } = useSession();

  const onFinish = async (values: any) => {

    try {
      const { paymentUrl } = await api(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify({...values,items:cart}),
      });
      // Open new tab
      window.open(paymentUrl, '_blank');
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
          // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email addresss">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phonenumber"
            label="Phone number"
          // rules={[{ min: 0, max: 99, required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Shipping adress"
          // rules={[{ required: true }]}
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
            className="mx-auto mt-2 bg-black px-[50px] py-1 text-sm text-white"
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
                        <div className="text-green-500 text-xs">
                          {item.quantity} x{' '}
                        </div>
                      )}
                      ${item.product?.price}
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
                  {/* <span */}
                  {/*   className="text-blue-500" */}
                  {/*   style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }} */}
                  {/*   onClick={() => removeItem(wixClient, item._id!)} */}
                  {/* > */}
                  {/*   Remove */}
                  {/* </span> */}
                </div>
              </div>
            </div>
          ))
        )}
        <div className="w-full border border-gray-200" />
        <div className="flex items-center justify-between font-normal">
          <span className="">Total</span>
          <span className="">${total}</span>
        </div>
      </div>
    </main>
  );
}
