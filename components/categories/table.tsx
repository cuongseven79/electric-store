'use client';

import { ICategory } from '@/lib/definitions';
import { Table } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (id: string, record: ICategory) => (
      <Link href={`/admin/categories/${record.id}`}>{id}</Link>
    ),
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (v) => dayjs(v).format('HH:mm:ss DD-MM-YYYY'),
    sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
  },
];
export default function Index({ data }: { data: ICategory[] }) {
  return (
    <Table
      columns={columns}
      rowKey={(record: ICategory) => record.id}
      dataSource={data}
    />
  );
}
