import Table from '@/components/blogs/table';
import { Metadata } from 'next';
import { Icon } from '@/components/icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Suspense } from 'react';
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Blogs management</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Link
          href="/admin/blogs/create"
          className="button flex items-center gap-2"
        >
          <Icon icon={faPlus} color={'white'} />
          New blog
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Table />
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </div>
  );
}
