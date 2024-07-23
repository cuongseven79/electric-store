import Form from '@/components/staffs/create-form';
import Breadcrumbs from '@/components/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Staff',
};

export default async function Page() {
  return (
    <main className="h-full w-full">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Staffs', href: '/admin/staffs' },
          {
            label: 'Create Staff',
            href: '/admin/staffs/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
