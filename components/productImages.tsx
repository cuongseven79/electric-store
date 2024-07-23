'use client';
import { IProduct, IProductAsset } from '@/lib/definitions';
import { useState } from 'react';

export const ProductImages = ({ items }: { items: IProductAsset[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="h-[500px]">
       {items.length > 0 && <img
          src={items[index].url}
          alt=""
          className="h-auto max-h-[500px] w-auto max-w-[500px] rounded-md object-cover"
        />}
      </div>
      <div className="flex w-full  min-w-0 flex-row flex-wrap justify-center">
        {items.map((item: any, i: number) => (
          <div
            className="mx-2 my-1 h-[50px] w-[50px] cursor-pointer"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <img
              src={item.url}
              className="h-[50px] w-[50px] rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
