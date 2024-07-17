'use client';

import api from '@/lib/api';
import { Category } from '@/lib/data/category';
import { FormattedUser, UserUpdateFields } from '@/lib/data/user';
import type { FormProps } from 'antd';
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
  data: Category;
};

export default function EditForm(props: Props) {
  const router = useRouter();
  const _handelUpdate = async (data: UserUpdateFields) => {
    try {
      await api(`/api/categories/${props.data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });

      message.success('Successfully.');
    } catch (error) {
      message.error(error.message);
    }
  };

  const _handleDelete = async () => {
    try {
      await api(`/api/categories/${props.data.id}`, {
        method: 'DELETE',
      });
      message.success('Successfully.');
      router.back();
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Form
      name="basic"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={props.data}
      onFinish={_handelUpdate}
      layout="vertical"
    >
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          { required: true, message: 'Please input your category name!',min:4 },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <button className="button" type="submit">
            Update
          </button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this staff?"
            onConfirm={_handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <button className="button-outline">Delete</button>
          </Popconfirm>
        </Space>
      </Form.Item>
    </Form>
  );
}
