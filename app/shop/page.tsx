import { ProductList } from '@/components/products/list';

export default async function Page({}: {}) {
  return (
    <main className="flex h-full w-full gap-2">
      <ProductList />
    </main>
  );
}
