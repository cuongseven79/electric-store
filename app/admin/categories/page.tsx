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

export default async function Page() {
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
      <Table />
    </div>
  );
}
