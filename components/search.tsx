'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useSearchBox } from 'react-instantsearch';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { query, refine } = useSearchBox();
  const ref = useRef();

  const handleSearch = useDebouncedCallback((term) => {
    replace('/shop');
    refine(term);
  }, 300);

  useEffect(() => {
    if (searchParams.get('category')) {
      refine('');
      ref.current.value = '';
    }
  }, [searchParams.get('category')]);

  return (
    <div className="relative my-2 flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        ref={ref}
        className="order-gray-200 peer block w-full rounded-full py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString() || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
