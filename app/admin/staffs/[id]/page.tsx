import Form from '@/components/staffs/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';
import api from '@/lib/api';

export const metadata: Metadata = {
  title: 'Edit Staff',
};

export default async function Page({ params }: { params: { id: string } }) {
  const staff = await getStaff(params.id);
  return (
    <div className="mx-auto h-full w-full ">
      <Form staff={staff} />
    </div>
  );
}

async function getStaff(id: string) {
  try {
    const response = await api(`/api/staffs/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    return { message: `Failed to get staff.${error}` };
  }
}
