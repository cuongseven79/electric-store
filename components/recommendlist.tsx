'use client';

import { LookingSimilar } from 'react-instantsearch';
import { ProductHit } from './products/card';

export function RecommendList({ productID }: { productID: number }) {
  return (
    <div className="w-full overflow-x-auto">
      <LookingSimilar
        classNames={{ list: 'flex flex-row gap-2' }}
        objectIDs={[`${productID}`]}
        limit={10}
        itemComponent={({ item }) => {
          return <ProductHit hit={item} />;
        }}
        translations={{
          title: '',
        }}
      />
    </div>
  );
}
