'use client';
import { Icon } from '@/components/icon';
import api from '@/lib/api';
import {
  faArrowUp,
  faBox,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { registerables, Chart } from 'chart.js';
import dayjs from 'dayjs';
import { VND } from '@/lib/currency';
import { IProduct, IUser } from '@/lib/definitions';

Chart.register(...registerables);

export function NewUserCard({}) {
  const [data, setData] = useState<{ today: any; total: any }>();
  useEffect(() => {
    (async () => {
      const resp = await api('/api/statistics/users');
      setData(resp);
    })();
  }, []);

  return data ? (
    <div className="flex h-auto w-full rounded border border-[2px] border-primary border-opacity-50 p-2">
      <div className="flex w-[80%]  flex-col gap-2">
        <div className="text-md font-semibold text-gray-400">New User</div>
        <div className="text-2xl font-bold">
          {data?.today} <span className="text-sm text-gray-400">(Today)</span>
        </div>

        <div className="flex justify-around">
          <div className="flex flex-col  items-center justify-center">
            <div className="text-gray-300">Total</div>
            <div>{data?.total}</div>
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        <div className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-400">
          <Icon icon={faUser} color="white" />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export function OrderCard({}) {
  const [data, setData] = useState<{
    today: number;
    shipping: number;
    done: number;
    total: number;
  }>();
  useEffect(() => {
    (async () => {
      const resp = await api('/api/statistics/orders');
      setData(resp);
    })();
  }, []);

  return data ? (
    <div className="flex h-auto w-full rounded border border-[2px] border-primary border-opacity-50 p-2">
      <div className="flex w-[80%]  flex-col gap-2">
        <div className="text-md font-semibold text-gray-400">New order</div>
        <div className="text-2xl font-bold">
          {data.today} <span className="text-sm text-gray-400">(Today)</span>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col  items-center justify-center">
            <div className="text-gray-300">Shipping</div>
            <div>{data.shipping}</div>
          </div>
          <div className="flex flex-col  items-center justify-center">
            <div className="text-gray-300">Completed</div>
            <div>{data.done}</div>
          </div>
          <div className="flex flex-col  items-center justify-center">
            <div className="text-gray-300">Total</div>
            <div>{data.total}</div>
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        <div className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-green">
          <Icon icon={faCartShopping} color="white" />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export function ProductCard({}) {
  const [data, setData] = useState<{
    today: number;
    sold: number;
    remaining: number;
  }>();
  useEffect(() => {
    (async () => {
      const resp = await api('/api/statistics/products');
      setData(resp);
    })();
  }, []);

  return data ? (
    <div className="flex h-auto w-full rounded border border-[2px] border-primary border-opacity-50 p-2">
      <div className="flex w-[80%]  flex-col gap-2">
        <div className="text-md font-semibold text-gray-400">Sold product</div>
        <div className="text-2xl font-bold">
          {data.today} <span className="text-sm text-gray-400">(Today)</span>
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col  items-center justify-center">
            <div className="text-gray-300">Sold</div>
            <div>{data.sold}</div>
          </div>
          <div className="flex flex-col  items-center justify-center">
            <div className="text-gray-300">Remaining</div>
            <div>{data.remaining}</div>
          </div>
        </div>
      </div>
      <div className="w-[20%]">
        <div className="m-1 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-orange">
          <Icon icon={faBox} color="white" />
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export function RevenueChart({}) {
  const [label, setLabel] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      const { byDate } = await api('/api/statistics/revenue');
      let _label: string[] = new Array();
      let _data: number[] = new Array();
      byDate.forEach((v) => {
        _label.push(dayjs(v.date).format('DD-MM-YYYY'));
        _data.push(v.sum);
      });
      setLabel(_label);
      setData(_data);
    })();
  }, []);

  return (
    <div>
      <Line
        data={{
          datasets: [{ id: 1, label: 'Revenue last 7 days', data: data }],
          labels: label,
        }}
      />
    </div>
  );
}

export function ProductRanking({}) {
  const [data, setData] = useState<{ product: IProduct; count: number }[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api('/api/statistics/products/ranking');
      setData(data);
    })();
  }, []);

  return data ? (
    <div className="w-full">
      <div className="font-semibold uppercase">Top sale products</div>
      <div className="flex h-auto w-full flex-col gap-2 rounded border border-[2px] border-primary border-opacity-50 p-2">
        {data.map((v, i) => (
          <div key={i} className="flex w-full gap-2">
            <img
              src={v.product?.assets?.length >0  && v.product?.assets[0].url }
              className="h-[30px] w-[30px] rounded-full"
            />
            <div className="flex w-full justify-between">
              <div>{v.product.name}</div>
              <div>{v.count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export function UserRanking({}) {
  const [data, setData] = useState<{ user: IUser; total: number }[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api('/api/statistics/orders/ranking');
      setData(data);
    })();
  }, []);

  return data ? (
    <div className="w-full">
      <div className="font-semibold uppercase">Top users</div>
      <div className="flex h-auto w-full flex-col gap-2 rounded border border-[2px] border-primary border-opacity-50 p-2">
        {data.map((v) => (
          <div className="flex w-full gap-2">
            <img
              src={v.user?.image || ''}
              className="h-[30px] w-[30px] rounded-full"
            />
            <div className="flex w-full justify-between">
              <div>{v.user?.name}</div>
              <div>{VND(v.total).format()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
