// import { lusitana } from '@/components/fonts';
import Table from '@/components/products/table';
import { Metadata } from 'next';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Search from '@/components/search';
import api from '@/lib/api';
import { IProduct } from '@/lib/definitions';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SyncButton } from '@/components/syncbutton';

export const metadata: Metadata = {
  title: 'Catetories',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Product management</h1>
      </div>
      <div className="mb-2 mt-4  flex gap-2 md:mt-8">
        <Link href="/admin/products/create" className="button">
          <Icon icon={faPlus} className="mr-2 text-white" />
          New product
        </Link>
        <SyncButton />
      </div>
      <Table />
    </div>
  );
}
