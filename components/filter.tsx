'use client';

import api from '@/lib/api';
import { ICategory, IProduct } from '@/lib/definitions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Filter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const fetchCategories = async () => {
    await api('/api/categories').then((resp) => setCategories(resp.data));
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-12 flex w-full justify-between">
      <div className="flex flex-wrap gap-6">
        {/* <select */}
        {/*   name="type" */}
        {/*   id="" */}
        {/*   className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium" */}
        {/*   onChange={handleFilterChange} */}
        {/* > */}
        {/*   <option>Type</option> */}
        {/*   <option value="physical">Physical</option> */}
        {/*   <option value="digital">Digital</option> */}
        {/* </select> */}
        {/* <input */}
        {/*   type="text" */}
        {/*   name="min" */}
        {/*   placeholder="min price" */}
        {/*   className="w-24 rounded-2xl pl-2 text-xs ring-1 ring-gray-400" */}
        {/*   onChange={handleFilterChange} */}
        {/* /> */}
        {/* <input */}
        {/*   type="text" */}
        {/*   name="max" */}
        {/*   placeholder="max price" */}
        {/*   className="w-24 rounded-2xl pl-2 text-xs ring-1 ring-gray-400" */}
        {/*   onChange={handleFilterChange} */}
        {/* /> */}
        <select
          name="category"
          className="rounded-2xl bg-white px-6 py-2 text-xs font-medium ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          {categories.map((c: ICategory) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {/* <select */}
        {/*   name="" */}
        {/*   id="" */}
        {/*   className="rounded-2xl bg-[#EBEDED] px-4 py-2 text-xs font-medium" */}
        {/* > */}
        {/*   <option>All Filters</option> */}
        {/* </select> */}
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="rounded-2xl bg-white px-4 py-2 text-xs font-medium ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};
