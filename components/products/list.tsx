'use client';
import {
  Pagination,
  useClearRefinements,
  useHits,
  useMenu,
  useSortBy,
} from 'react-instantsearch';
import { ProductHit } from './card';
import { Panel } from '../panel';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Empty } from 'antd';
import { clear } from 'console';

export function ProductList() {
  const [categoryOptions, setCategoryOptions] = useState<[]>([]);
  const { hits, sendEvent } = useHits({});
  const { refine, canRefine } = useMenu({ attribute: 'categoryId' });
  const { refine: clearMenu } = useClearRefinements({
    includedAttributes: ['categoryId'],
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchCategories = async () => {
    await api('/api/categories').then((resp) => setCategoryOptions(resp.data));
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const query = searchParams.get('category');
    if (query && query != '') {
      refine(query);
    } else {
      clearMenu();
    }
  }, [searchParams.toString()]);

  return (
    <main className="flex h-full w-full flex-row gap-2">
      <div className="flex min-w-[200px] flex-col">
        <Panel header="Categories">
          <ul>
            {[{ id: '', name: 'For you' }, ...categoryOptions].map((item) => (
              <li key={item.id}>
                <div
                  className="mt-2 hover:cursor-pointer hover:text-primary"
                  onClick={() => {
                    router.replace(`/shop?category=` + item.id);
                  }}
                >
                  <div
                    className={clsx(
                      searchParams.get('category') == item.id && 'font-bold',
                    )}
                  >
                    {item.name}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="flex h-full w-full flex-col gap-2">
        <Sorter />
        <div className="grid w-full grid-flow-row grid-cols-1 items-center gap-7  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {!canRefine ? (
            <></>
          ) : (
            hits.map((hit) => (
              <ProductHit
                hit={{ objectId: hit.id, ...hit }}
                key={hit.objectID}
                sendEvent={sendEvent}
              />
            ))
          )}
        </div>
        <div className="mt-10 flex w-full flex-row justify-center">
          <Pagination
            padding={0}
            classNames={{ list: 'flex flex-row gap-2' }}
            showFirst={false}
            showLast={false}
            translations={{
              previousPageItemText: 'Previous',
              nextPageItemText: 'Next',
              pageItemText: ({ currentPage, nbPages }) =>
                `(${currentPage}/${nbPages})`,
            }}
          />
        </div>
      </div>
    </main>
  );
}
const sortOptions = [
  { label: 'Featured', value: 'ecommerce' },
  { label: 'Price (asc)', value: 'ecommerce_price_asc' },
  { label: 'Price (desc)', value: 'ecommerce_price_desc' },
];
function Sorter() {
  const { refine } = useSortBy({ items: sortOptions });
  return (
    <select
      name="sort"
      className="w-[150px] rounded-2xl bg-white px-4 py-2 text-xs font-medium ring-1 ring-primary"
      onChange={(v) => refine(v.target.value)}
    >
      <option>Sort By</option>
      {sortOptions.map((v) => (
        <option value={v.value} key={v.value}>
          {v.label}
        </option>
      ))}
    </select>
  );
}
