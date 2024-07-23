'use client';
import { useTrendingItems } from 'react-instantsearch';

export function TrendingList() {
  const { items } = useTrendingItems({});

  return (
    <main className="flex h-full w-full flex-row gap-2">
      <div className="flex min-w-[200px] flex-col">
        <div className="grid w-full grid-flow-row grid-cols-1 items-center gap-7  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.key}>{JSON.stringify(i)}</div>
            // <ProductHit
            //   hit={{ objectId: hit.id, ...hit }}
            //   key={hit.objectID}
            //   sendEvent={sendEvent}
            // />
          ))}
        </div>
      </div>
    </main>
  );
}
