import { OrderList } from '@/components/orders/list';
import api from '@/lib/api';
import { apiSSR } from '@/lib/apissr';
import { IOrder } from '@/lib/definitions';
import { Tabs } from 'antd';

export default async function Page() {
  const result = await fetchOrder();

  return (
    <div className="h-full w-[70%] gap-4 ">
      <OrderList data={result.data} />
    </div>
  );
}

async function fetchOrder(): Promise<IOrder[] | any> {
  try {
    const resp = await apiSSR('/api/public/orders');
    return resp;
  } catch (error) {
    return [];
  }
}
