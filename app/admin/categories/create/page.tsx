import Form from '@/components/categories/create-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Staff',
};

export default async function Page() {
  return <Form />;
}
