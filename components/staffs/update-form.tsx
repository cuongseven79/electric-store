'use client';

import api from '@/lib/api';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
} from 'antd';
import { redirect, useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

type Props = {
  staff: any;
};

export default function EditForm(props: Props) {
  const router = useRouter();
  const _handelUpdate = async (data: any) => {
    try {
      await api(`/api/staffs/${props.staff.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });

      message.success('staff updated successfully.');
    } catch (error) {
      console.log(error);
      message.error('Failed to update staff.', error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={props.staff}
      onFinish={_handelUpdate}
    >
      <Form.Item label="Full name" name="fullname">
        <Input />
      </Form.Item>

      <Form.Item label="email" name="email">
        <Input type="email" disabled />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
