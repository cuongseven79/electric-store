'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function TableSearch({
  data,
  searchKeys,
  onChange,
  placeholder,
}: {
  data: any[];
  onChange: (v: any) => void;
  searchKeys: string[];
  placeholder?: string;
}) {
  const ref = useRef();
  const handleSearch = useDebouncedCallback((term) => {
    onChange(
      data.filter((v) => {
        for (let i = 0; i < searchKeys.length; i++) {
          if (
            v[searchKeys[i]]
              .toString()
              .toLowerCase()
              .includes(term.toLowerCase())
          )
            return true;
        }
      }),
    );
  }, 300);

  useEffect(() => {
    handleSearch(ref.current.value);
  }, [data]);

  return (
    <div className="relative my-2 flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={ref}
        placeholder={placeholder}
        className="order-gray-200 peer block w-full rounded-full py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
