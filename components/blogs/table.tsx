'use client';
import { Avatar, Badge, Image, Space, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IBlog, IOrder } from '@/lib/definitions';
import { VND } from '@/lib/currency';
import dayjs from 'dayjs';

const colorStatus = {
  Pending: 'yellow',
  Paid: 'blue',
  Done: 'green',
  Expired: 'red',
};

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (id: string, record: IBlog) => (
      <Link href={`/admin/blogs/${record.id}`}>{id}</Link>
    ),
  },
  {
    title: 'Author',
    key: 'author',
    render: (id: string, record: IBlog) => record.author?.fullname,
  },
  {
    title: 'Related product',
    key: 'productId',
    render: (id: string, record: IBlog) => record.product?.name,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (v) => dayjs(v).format('HH:mm:ss DD-MM-YYYY'),
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (v) => dayjs(v).format('HH:mm:ss DD-MM-YYYY'),
  },
];
export default function Index({ data }: { data: IBlog[] }) {
  return (
    <Table
      columns={columns}
      rowKey={(record: IBlog) => record.id}
      dataSource={data}
    />
  );
}
