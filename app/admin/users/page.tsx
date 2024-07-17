import Table from '@/components/users/table';
import { Metadata } from 'next';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Search from '@/components/search';
import api from '@/lib/api';
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const { data } = await list();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>User management</h1>
      </div>
      <Table data={data || []} />
    </div>
  );
}
async function list(): Promise<[] | any> {
  try {
    const resp = await api('/api/users');
    return resp;
  } catch (error) {
    return { data: [] };
  }
}
