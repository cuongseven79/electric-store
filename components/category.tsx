'use client';
import api from '@/lib/api';
import { ICategory } from '@/lib/definitions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CategoryList() {
  const [categories, setCategories] = useState([]);

  async function fetchData() {
    try {
      const resp = await api('/api/home/categories');
      setCategories(resp.data || []);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid w-full grid-flow-row grid-cols-1 items-center gap-7  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {categories.map((v: ICategory, i) => (
        <Link
          href={'/shop?category=' + v.id}
          key={i}
          className="z-1 flex h-[220px] w-[200px] flex-col items-center justify-between gap-3 rounded "
        >
          <div className="flex h-[200px] w-[200px]  items-center justify-center ">
            <img
              src={v.product.assets && v.product.assets[0].url}
              className="z-10 h-auto max-h-[180px] w-auto  object-cover"
            />
          </div>
          <span className="text-md font-shadow text-center font-bold text-primary ">
            {v.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
