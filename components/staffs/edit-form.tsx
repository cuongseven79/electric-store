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

      message.success('Update staff successfully.');
    } catch (error) {
      message.error(error.message);
    }
  };

  const _handleDelete = async () => {
    try {
      await api(`/api/staffs/${props.staff.id}`, {
        method: 'DELETE',
      });
      message.success('Delete staff successfully.');
      router.refresh();
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      initialValues={props.staff}
      onFinish={_handelUpdate}
    >
      <Form.Item
        label="Full name"
        name="fullname"
        rules={[
          {
            min: 2,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input type="email" disabled />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            message: 'Please input your password!',
            min: 6,
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
        <Space>
          <button type="submit" className="button">
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
