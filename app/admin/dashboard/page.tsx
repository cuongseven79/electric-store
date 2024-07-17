import {
  NewUserCard,
  OrderCard,
  ProductCard,
  ProductRanking,
  RevenueChart,
  UserRanking,
} from '@/components/chart';

export default async function Page() {
  return (
    <main className="flex h-full w-full flex-col gap-5">
      <div className="flex gap-3">
        <NewUserCard />
        <OrderCard />
        <ProductCard />
      </div>
      <div className="mt-2 flex w-full gap-5">
        <ProductRanking />
        <UserRanking />
      </div>
      <RevenueChart />
    </main>
  );
}
