// import { lusitana } from '@/components/fonts';
import Table from '@/components/staffs/table';
import { InvoiceSkeleton } from '@/components/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Search from '@/components/search';
import api from '@/lib/api';
import { Icon } from '@/components/icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
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
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { data: staffs, totalPages } = await listStaff();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Staffs</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Link href="/admin/staffs/create" className="button">
          <Icon icon={faPlus} className="mr-2 text-white" />
          New staff
        </Link>
      </div>
      <Table data={staffs} />
    </div>
  );
}
async function listStaff(): Promise<[] | any> {
  try {
    const resp = await api('/api/staffs');
    return resp;
  } catch (error) {
    message.error('Failed to fetch staffs');
  }
}
