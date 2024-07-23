'use client';

import api from '@/lib/api';
import { ICategory } from '@/lib/definitions';
import { Table, message } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
export default function Index() {
  const [data, setData] = useState([]);

  async function fetch(): Promise<ICategory[]> {
    try {
      const resp = await api('/api/categories');
      setData(resp.data);
    } catch (error) {
      message.error(error);
    }
  }
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Table
      columns={columns}
      rowKey={(record: ICategory) => record.id}
      dataSource={data}
    />
  );
}
