import Table from '@/components/categories/table';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Search from '@/components/search';
import api from '@/lib/api';
import { CommonQuery, ICategory } from '@/lib/definitions';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export const metadata: Metadata = {
  title: 'Catetories',
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
  const page = Number(searchParams?.page) || 1;
  const { data, total } = await fetchList({ query, page });

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Product Categories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Link
          href="/admin/categories/create"
          className="button flex items-center gap-2"
        >
          <Icon icon={faPlus} color={'white'} />
          New category
        </Link>
      </div>
      <Table data={data} />
    </div>
  );
}
async function fetchList(params?: any): Promise<any> {
  try {
    const resp = await api(
      '/api/categories?' + new URLSearchParams(params).toString(),
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
}
