'use client';
import api from '@/lib/api';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { redirect, useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();

  const _handleCreate = async (data: any) => {
    await api('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        message.info('Create category successfully');
        router.replace('/admin/categories');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={_handleCreate}
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          { required: true, message: 'Please input your category name!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
