'use client';
import { Badge, DatePicker, Table, message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { IOrder } from '@/lib/definitions';
import { VND } from '@/lib/currency';
import dayjs from 'dayjs';
import { TableSearch } from '../tablesearch';
import { ExportButton } from '../exportbutton';
import api from '@/lib/api';

const colorStatus = {
  Pending: 'yellow',
  Paid: 'blue',
  Done: 'green',
  Expired: 'red',
};

const columns = [
  {
    title: 'Payment ID',
    dataIndex: 'paymentId',
    key: 'paymentId',
    render: (id: string, record: IOrder) => (
      <Link href={`/admin/orders/${record.id}`}>{id}</Link>
    ),
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (v) => <Badge color={colorStatus[v]} text={v} />,
    filters: [
      {
        text: 'Done',
        value: 'Done',
      },
      {
        text: 'Paid',
        value: 'Paid',
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (v: number) => VND(v).format({}),
    sorter: (a, b) => a.total - b.total,
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
  const [searchData, setSearchData] = useState([]);
  const [range, setRange] = useState();

  const filtered = useMemo(() => {
    if (!range) return data;
    const begin = dayjs(range[0]);
    const end = dayjs(range[1]);
    return data.filter(
      (i) =>
        dayjs(i.createdAt).isBefore(end) && dayjs(i.createdAt).isAfter(begin),
    );
  }, [range, searchData]);

  async function fetch(): Promise<[] | any> {
    try {
      const resp = await api('/api/orders');
      setData(resp.data);
      setSearchData(resp.data);
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <ExportButton data={searchData} />

      <DatePicker.RangePicker
        defaultPickerValue={[dayjs(), dayjs()]}
        value={range}
        onChange={setRange}
      />
      <TableSearch
        data={filtered}
        onChange={setSearchData}
        searchKeys={['paymentId']}
        placeholder="Search by payment ID"
      />
      <Table
        columns={columns}
        rowKey={(record: IOrder) => record.id}
        dataSource={searchData}
      />
    </div>
  );
}
