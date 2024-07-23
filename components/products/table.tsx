'use client';
import api from '@/lib/api';
import { Avatar, Image, Space, Table, Tag, message } from 'antd';
import { ProductCard } from './card';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Category, Product, ProductAsset } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { VND } from '@/lib/currency';
import dayjs from 'dayjs';
import { TableSearch } from '../tablesearch';
import { IProduct } from '@/lib/definitions';

const columns = [
  {
    title: '',
    dataIndex: 'assets',
    key: 'assets',
    render: (images: ProductAsset[], record: Product) => (
      <Link href={`/admin/products/${record.id}`}>
        <Space size="middle">
          {images?.length > 0 && <Avatar size={64} src={images[0].url} />}
        </Space>
      </Link>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: Product) => (
      <Link href={`/admin/products/${record.id}`}>
        <div>{name}</div>
      </Link>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (v: number) => <div>{VND(v).format()}</div>,
  },
  {
    title: 'Categories',
    dataIndex: 'category',
    key: 'categoryId',
    render: (v: Category) => v.name,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (v) => dayjs(v).format('HH:mm:ss DD-MM-YYYY'),
    sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
  },
];
export default function Index() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  async function fetch(): Promise<IProduct[] | any> {
    try {
      const resp = await api('/api/products');
      setData(resp);
      setFiltered(resp);
    } catch (err) {
      message.error(err?.message || JSON.stringify(err));
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <TableSearch
        data={data}
        onChange={setFiltered}
        searchKeys={['name', 'price']}
      />
      <Table
        columns={columns}
        rowKey={(record: Product) => record.id}
        dataSource={filtered}
      />
    </div>
  );
}
