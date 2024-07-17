'use client';
import { Avatar, Image, Space, Table, Tag, message } from 'antd';
import Link from 'next/link';
import { Category, Product, ProductAsset } from '@prisma/client';
import { VND } from '@/lib/currency';
import { IUser } from '@/lib/definitions';
import { record } from 'zod';
import { useRouter } from 'next/navigation';
import { Icon } from '../icon';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { TableSearch } from '../tablesearch';
import { useState } from 'react';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '20%',
  },
  {
    title: 'Full name',
    dataIndex: 'name',
    render: (name: string, record: IUser) => (
      <Space>
        <Avatar src={record?.image} />
        <Link href={`/admin/users/${record.id}`}>{name}</Link>
      </Space>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (value: string, record: IUser) => (
      <Link href={`/admin/users/${record.id}`}>{value}</Link>
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
export default function Index({ data }: { data: IUser[] }) {
  const [filtered, setFiltered] = useState(data);
  return (
    <div>
      <TableSearch
        data={data}
        onChange={setFiltered}
        searchKeys={['id', 'fullname', 'email']}
      />
      <Table
        size="small"
        columns={columns}
        rowKey={(record: IUser) => record.id}
        dataSource={filtered}
      />
    </div>
  );
}
