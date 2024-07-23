'use client';

import { CSVLink } from 'react-csv';
import { DatePicker, Form, message } from 'antd';
import { Icon } from './icon';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { IOrder } from '@/lib/definitions';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

export function ExportButton({ data }: { data: IOrder[] }) {
  const filtered = useMemo(() => {
    return data.reduce((prev, cur) => {
      const items =
        cur.items?.map((v) => ({
          paymentMethod: cur.paymentMethod,
          paymentId: cur.paymentId,
          productId: v.productId,
          productName: v.product?.name,
          price: v.price,
          quantity: v.quantity,
          total: v.price * v.quantity,
          buyerId: cur.user?.id,
          buyerName: cur.user?.name,
          createdAt: dayjs(cur.createdAt).format('HH:mm DD-MM-YYYY'),
        })) || [];
      return [...prev, ...items];
    }, []);
  }, [data]);

  return (
    <div className="my-4 flex">
      <CSVLink
        data={filtered}
        className="button flex items-center gap-2 text-white"
        filename={`export-${dayjs().unix()}.csv`}
        onClick={(event) => {
          if (filtered.length != 0) return true;
          message.error("Can't export because of no record.");
          return false;
        }}
      >
        <Icon icon={faFileExport} color="white" />
        <span>Export</span>
      </CSVLink>
    </div>
  );
}
