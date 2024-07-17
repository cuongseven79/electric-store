'use client';
import { IStaff } from '@/lib/definitions';
import { displayTimeStamp } from '@/lib/utils';
import { Table, message } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { TableSearch } from '../tablesearch';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    render: (id: string, record: IStaff) => (
      <Link href={`/admin/staffs/${record.id}`}>{id}</Link>
    ),
  },
  {
    title: 'Full name',
    dataIndex: 'fullname',
    key: 'fullname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (v: string, record: IStaff) => (
      <Link href={`/admin/staffs/${record.id}`}>{v}</Link>
    ),
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (v) => dayjs(v).format('HH:mm:ss DD-MM-YYYY'),
    sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
  },
  {
    title: 'Updated at',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (v) => dayjs(v).format('HH:mm:ss DD-MM-YYYY'),
    sorter: (a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
  },
];
export default function Index({ data }: { data: IStaff[] }) {
  const [filtered, setFiltered] = useState(data);

  return (
    <div>
      <TableSearch
        data={data}
        onChange={setFiltered}
        searchKeys={['fullname', 'email']}
      />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={filtered}
      />
    </div>
  );
}
