import Form from '@/components/blogs/create-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Staff',
};

export default async function Page() {
  return (
    <main className="flex w-full flex-col">
      <Form />
    </main>
  );
}
