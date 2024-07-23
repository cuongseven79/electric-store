'use client';
import api from '@/lib/api';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  message,
} from 'antd';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImageItem } from '../image';
import { Category, Product } from '@prisma/client';
import { IProduct } from '@/lib/definitions';
import { Uploader } from '../uploader';

const { Option } = Select;

export default function EditForm({ data }: { data: IProduct }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api('/api/categories', { method: 'GET' }).then((resp) =>
      setCategories(resp.data),
    );
  }, []);

  const _handleUpdate = (values: any) => {
    api(`/api/products/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    })
      .then(() => {
        message.info('Update product successfully');
        router.push('/admin/products');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const _handleDelete = async () => {
    await api(`/api/products/${data.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        message.info('Delete product successfully');
        router.push('/admin/products');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Form
        initialValues={data}
        name="basic"
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        onFinish={_handleUpdate}
        layout="vertical"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              min: 4,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true }]}
        >
          <Select defaultValue={data.categoryId}>
            {categories.map((category) => (
              <Option value={category.id} key={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber
            addonAfter="VND"
            defaultValue={data?.price || 0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your category name!',
              min: 1,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Images"
          name="images"
          initialValue={data.assets?.map((v) => v.url)}
        >
          <Uploader />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <button className="button" type="submit">
              Update
            </button>
            <Popconfirm
              title="Delete the product"
              description="Are you sure to delete this product?"
              onConfirm={_handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <button className="button-outline" type="button">
                Delete
              </button>
            </Popconfirm>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
