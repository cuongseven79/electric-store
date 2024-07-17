import Table from '@/components/orders/table';
import { Metadata } from 'next';
import { Button, message } from 'antd';
import Search from '@/components/search';
import api from '@/lib/api';
import { ExportButton } from '@/components/exportbutton';
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
        <h1 className={`mb-2 text-2xl`}>Order management</h1>
      </div>
      <Table data={data || []} />
    </div>
  );
}
async function list(): Promise<[] | any> {
  try {
    const resp = await api('/api/orders');
    return resp;
  } catch (error) {
    return { data: [] };
  }
}