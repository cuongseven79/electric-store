import Form from '@/components/staffs/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';
import api from '@/lib/api';
import { Avatar } from 'antd';

export const metadata: Metadata = {
  title: 'Edit Staff',
};

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetchData(params.id);
  return (
    <main className="flex w-full flex-col items-center">
      <div className="flex  w-auto min-w-[400px] flex-col items-center justify-center rounded-md border border-gray-200 p-5">
        <Avatar src={user.image} size={100} />
        <div className="mt-10 flex w-full flex-row justify-between">
          <div className="font-semibold">ID</div>
          <div>{user.id}</div>
        </div>
        <div className="mt-1 flex w-full flex-row justify-between">
          <div className="font-semibold">Full Name</div>
          <div>{user.name}</div>
        </div>
        <div className="mt-1 flex w-full flex-row justify-between">
          <div className="font-semibold">Email</div>
          <div>{user.email}</div>
        </div>

        <div className="mt-1 flex w-full flex-row justify-between">
          <div className="font-semibold">Phone</div>
          <div>{user.phone}</div>
        </div>

        <div className="mt-1 flex w-full flex-row justify-between">
          <div className="font-semibold">Country</div>
          <div>{user.country}</div>
        </div>
        <div className="mt-1 flex w-full flex-row justify-between">
          <div className="font-semibold">City</div>
          <div>{user.city}</div>
        </div>
        <div className="mt-1 flex w-full flex-row justify-between">
          <div className="font-semibold">Address</div>
          <div>{user.address}</div>
        </div>
      </div>
    </main>
  );
}

async function fetchData(id: string) {
  try {
    const response = await api(`/api/users/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    return { message: `Failed to get user.${error}` };
  }
}
