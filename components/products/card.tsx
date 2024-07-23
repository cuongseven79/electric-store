'use client';
import React from 'react';
import { Button, Card, Rate } from 'antd';
import { addToCart, useCart } from '@/contexts/cart';
import { IProduct, Product } from '@/lib/definitions';
import Link from 'next/link';
import { VND } from '@/lib/currency';
import { Highlight } from 'react-instantsearch';

const { Meta } = Card;

interface Props extends IProduct {
  onClick?: () => void;
}

export function ProductHit({
  hit: product,
  sendEvent,
}: {
  hit?: any;
  sendEvent?: any;
}) {
  return (
    <div
      className="z-1  relative flex h-[320px] w-[250px] flex-col gap-3 rounded border"
      key={product.id}
      onClick={() => {
        sendEvent('conversion', product, 'Interest');
      }}
    >
      <Link href={'/shop/' + product.id}>
        <div className="flex h-[200px] w-auto items-center justify-center">
          <img
            src={product.assets?.length > 0 && product.assets[0].url}
            className="z-10 h-full w-auto  object-cover transition-opacity duration-500"
          />
        </div>
        <div className="flex flex-auto flex-col items-center justify-center p-2">
          <span className="text-sm text-gray-400">{product.category.name}</span>
          <span className="font-semibold">
            <Highlight
              attribute={'name'}
              hit={product}
              className="text-sm  font-light"
            />
          </span>
          <span className="text-sm font-bold">
            {VND(product.price).format()}
          </span>
        </div>
      </Link>
    </div>
  );
}

export function ProductCard(props: Props) {
  return (
    <Card
      onClick={props.onClick}
      hoverable
      style={{ width: 180 }}
      cover={
        <div className="relative h-full w-full">
          <img
            alt="example"
            src={props.assets ? props.assets[0].url : ''}
            className="h-48 w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 flex w-full flex-row flex-wrap">
            <div className="m-[4px] rounded-lg bg-black px-2 text-xs text-white opacity-40">
              {props.category?.name}
            </div>
          </div>
        </div>
      }
    >
      <div className="text-center">
        <div className="font-[800]">{props.name}</div>
        <div className="text-red-500 font-[600]">{`$${props.price}`}</div>
        <div className="text-xs italic text-gray-300">{props.description}</div>
      </div>
    </Card>
  );
}
