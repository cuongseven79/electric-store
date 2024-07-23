'use client';
import api from '@/lib/api';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { redirect, useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();

  const _handleCreate = async (data: any) => {
    await api('/api/staffs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        message.info('Create staff successfully');
        router.replace('/admin/staffs');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Form
        name="basic"
        layout="vertical"
        style={{ width: '100%' }}
        autoComplete="off"
        onFinish={_handleCreate}
      >
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <button type="submit" className="button">
            Create
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
