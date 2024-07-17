import Form from '@/components/products/edit-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';
import api from '@/lib/api';
import { message } from 'antd';

export const metadata: Metadata = {
  title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchData(params.id);
  return (
    <main>
      <Form data={data} />
    </main>
  );
}

async function fetchData(id: string) {
  try {
    const response = await api(`/api/products/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    message.error('Failed to fetch data');
  }
}
