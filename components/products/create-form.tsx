'use client';
import api from '@/lib/api';
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  message,
} from 'antd';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImageItem } from '../image';
import { ICategory } from '@/lib/definitions';
import { Uploader } from '../uploader';

const { Option } = Select;

export default function CreateForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    api('/api/categories', { method: 'GET' }).then((resp) =>
      setCategories(resp.data),
    );
  }, []);

  const _handleCreate = async (data: any) => {
    api('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        message.info('Create product successfully');
        router.replace('/admin/products');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <Form
        name="basic"
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={_handleCreate}
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
        <Form.Item label="Quantity" name="quantity" initialValue={1}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            { required: true, message: 'Please input your category name!' },
          ]}
        >
          <Select>
            {categories?.map((category) => (
              <Option value={category.id} key={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <InputNumber
            addonAfter="VND"
            defaultValue={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please input your category name!' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Images" name="images">
          <Uploader />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <button className="button" type="submit">
            Create
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
