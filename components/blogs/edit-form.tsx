'use client';
import api from '@/lib/api';
import { IBlog, IProduct } from '@/lib/definitions';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Select, Space } from 'antd';
import { VND } from '@/lib/currency';
import BlogEditor from '../editor';
import { useSession } from 'next-auth/react';
import { Uploader } from '../uploader';

export default function EditForm({ data }: { data: IBlog }) {
  const router = useRouter();
  const [productOptions, setProductOptions] = useState<any>([]);
  const [isFetchingProduct, setFetchingProduct] = useState(false);
  const [form] = Form.useForm();
  const tag = Form.useWatch('tagName', form);
  const { data: session } = useSession();

  const handleSubmit = async (values) => {
    if (values.tagName == 'review') {
      delete values.imageUrl;
    } else {
      values.imageUrl = values.imageUrl[0];
    }
    await api(`/api/blogs/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...values,
        authorId: session.user.id,
      }),
    })
      .then(async (response) => {
        router.replace('/admin/blogs');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleDelete = async () => {
    await api(`/api/blogs/${data.id}`, {
      method: 'DELETE',
    })
      .then(async (response) => {
        router.replace('/admin/blogs');
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const fetchProducts = async () => {
    setFetchingProduct(true);
    await api('/api/products', {
      method: 'GET',
    })
      .then(async (response) => {
        const data = response as IProduct[];
        setProductOptions(
          data.map((i: IProduct) => ({
            value: i.id,
            title: i.name,
            label: (
              <div className="flex flex-row justify-between">
                <img
                  src={i.assets[0].url}
                  className="h-[50px] w-[50px] object-contain"
                />
                <div className="flex flex-col justify-between">
                  <div>{i.name}</div>
                  <div>{VND(i.price).format()}</div>
                </div>
              </div>
            ),
          })),
        );
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => setFetchingProduct(false));
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ ...data, imageUrl: [data.imageUrl] }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              min: 4,
            },
          ]}
        >
          <Input placeholder="Blog title..." />
        </Form.Item>

        <Form.Item label="Tag" name="tagName">
          <Select
            defaultValue="blog"
            style={{ width: 120 }}
            options={[
              { value: 'blog', label: 'Blog' },
              { value: 'review', label: 'Review' },
            ]}
          />
        </Form.Item>
        {tag == 'review' && (
          <Form.Item label="Product" name="productId">
            <Select
              style={{ width: 400 }}
              loading={isFetchingProduct}
              optionLabelProp="title"
              options={productOptions}
            />
          </Form.Item>
        )}
        {tag == 'blog' && (
          <Form.Item label="Cover photo" name="imageUrl">
            <Uploader limit={1} />
          </Form.Item>
        )}

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              min: 4,
            },
          ]}
        >
          <BlogEditor />
        </Form.Item>

        <div className="flex flex-col gap-2">
          <button className="mx-[20%] bg-[black] p-2 text-white" type="submit">
            Update
          </button>
          <button
            type="button"
            className="mx-[20%] border p-2 text-black"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Form>
    </div>
  );
}
