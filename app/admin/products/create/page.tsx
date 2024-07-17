import Form from '@/components/products/create-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';

export default async function Page() {
  return (
    <main className="flex h-full w-full justify-center">
      <Form />
    </main>
  );
}
