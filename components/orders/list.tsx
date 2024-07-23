'use client';

import { IOrder } from '@/lib/definitions';
import { useEffect, useMemo, useState } from 'react';
import { FeedbackModal } from '../feedback';
import clsx from 'clsx';
import { Badge } from 'antd';
import { useRouter } from 'next/navigation';

const sortOptions = [
  { label: 'All', value: '' },
  { label: 'Done', value: 'Done' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Expired', value: 'Expired' },
];

const colorStatus = {
  Pending: 'yellow',
  Paid: 'blue',
  Done: 'green',
  Expired: 'red',
};

export function OrderList({ data }: { data: IOrder[] }) {
  const [feedbackShown, setFeedbackShown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [status, setStatus] = useState<string>('');
  const router = useRouter();
  const orders = useMemo(
    () => data?.filter((v) => (status === '' ? true : v.status === status)),
    [status],
  );

  useEffect(() => {
    if (selectedItem) {
      setFeedbackShown(true);
    }
  }, [selectedItem]);

  useEffect(() => {
    // repload page after hide modal
    if (!feedbackShown) {
      router.replace('/orders');
      router.refresh();
    }
  }, [feedbackShown]);

  return (
    <div>
      {feedbackShown && (
        <FeedbackModal handleToggle={setFeedbackShown} item={selectedItem} />
      )}
      <select
        name="sort"
        id=""
        className="w-[150px] rounded-2xl bg-white px-4 py-2 text-xs font-medium ring-1 ring-primary"
        onChange={(v) => setStatus(v.target.value)}
      >
        {sortOptions.map((v) => (
          <option value={v.value} key={v.value}>
            {v.label}
          </option>
        ))}
      </select>
      {orders?.map((order) => (
        <div
          key={order.id}
          className="m-2 m-2 flex  w-full flex-col overflow-hidden rounded border border-primary"
        >
          <div className={'bg-gray-200 p-2 text-primary'}>
            <Badge color={colorStatus[order.status]} /> {order.status} |#
            {order.paymentId}
          </div>
          <div className="flex p-2">
            <div className="flex min-h-0 flex-col overflow-auto">
              {order.items?.map((item) => (
                <div className="flex gap-4 p-2" key={item.productId}>
                  {item.product?.assets && (
                    <img
                      src={item.product.assets[0].url}
                      alt=""
                      width={72}
                      height={96}
                      className="rounded-md object-cover"
                    />
                  )}
                  <div className="flex w-full flex-col justify-between">
                    <div className="">
                      <div className="flex items-center justify-between gap-8">
                        <h3 className="font-semibold">{item.product?.name}</h3>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2 rounded-sm bg-gray-50 p-1">
                        {item.quantity && (
                          <div className="text-green-500 text-xs">
                            {item.quantity} x
                          </div>
                        )}
                        ${item.price}
                      </div>
                    </div>

                    {!item.feedbackId && order.status == 'Done' && (
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="button w-[100px]"
                      >
                        Feedback
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-[2_2_0] flex-col px-2">
              <div className="font-semibold uppercase">Payment Information</div>
              <div className="w-full border border-gray-200" />
              <div className="mt-1 flex flex-row justify-between">
                <div>Ordered At</div>
                <div>{order.createdAt.toString()}</div>
              </div>
              <div className="mt-1 flex flex-row justify-between">
                <div>Paid At</div>
                <div>{order.createdAt.toString()}</div>
              </div>
              <div className="mt-1 flex flex-row justify-between">
                <div>Payment method</div>
                <div className="uppercase">{order.paymentMethod}</div>
              </div>
              <div className="mt-1 flex flex-row justify-between">
                <div>Payment ID</div>
                <div className="uppercase">{order.paymentId}</div>
              </div>

              <div className="mt-10 font-semibold uppercase">
                Shipping Information
              </div>
              <div className="w-full border border-gray-200" />
              <div className="mt-1 flex flex-row justify-between">
                <div>Phone number</div>
                <div>{order.phone}</div>
              </div>
              <div className="mt-1 flex flex-row justify-between">
                <div>Address</div>
                <div>{order.address}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
