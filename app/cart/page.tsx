import { Poppins, Playfair_Display } from 'next/font/google';
import CartTable from '@/components/cart/table';

export default async function Page() {
  return (
    <main className="flex w-full flex-row">
      <CartTable />
    </main>
  );
}
