import Table from '@/components/staffs/table';
import { Metadata } from 'next';
import { Icon } from '@/components/icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page() {
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
      <Table />
    </div>
  );
}
