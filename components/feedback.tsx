'use client';
import { signIn, useSession } from 'next-auth/react';
import { Icon } from './icon';
import { faClose, faCross } from '@fortawesome/free-solid-svg-icons';
import api from '@/lib/api';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Rate,
  Space,
  message,
} from 'antd';
import { IOrderItem } from '@/lib/definitions';
import { redirect, useRouter } from 'next/navigation';

export const FeedbackModal = ({
  handleToggle,
  item,
}: {
  handleToggle: any;
  item: IOrderItem | null;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const _handelUpdate = async (data: any) => {
    try {
      await api(`/api/feedbacks`, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          userId: session?.user.id || '',
          orderId: item.orderId,
          productId: item.productId,
        }),
      });
      message.success('Feedback successfully.');
      handleToggle((v: boolean) => !v);
    } catch (error) {
      message.error('Failed to update staff.');
    }
  };
  return (
    status == 'authenticated' && (
      <div className=" absolute left-0 right-0 top-0 z-50  m-auto flex h-[100vh] w-[100vw] flex-col gap-6 rounded-md bg-black bg-opacity-20">
        <div className="m-auto w-[350px] rounded bg-white p-2 pb-10">
          <div className="flex justify-between p-2">
            <h2 className="text-xl">Feedback</h2>
            <button
              onClick={() => handleToggle && handleToggle((v: boolean) => !v)}
            >
              <Icon icon={faClose} />
            </button>
          </div>
          <div className="flex w-full flex-col  p-2">
            <Form onFinish={_handelUpdate} layout="vertical">
              <Form.Item name="rate" label="Rate">
                <Rate />
              </Form.Item>
              <Form.Item label="Review" name="review">
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                  <button className="button" type="submit">
                    Review
                  </button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  );
};
