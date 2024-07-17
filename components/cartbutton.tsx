'use client';
import { useCallback, useState } from 'react';
import { useCart } from '@/contexts/cart';

export const Add = ({
  productId,
  stockNumber,
}: {
  productId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === 'i' && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const { addCart, isLoading } = useCart();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center justify-between rounded-3xl bg-gray-100 px-4 py-2">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('d')}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('i')}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{' '}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={() => {
            addCart(productId, quantity);
          }}
          disabled={isLoading}
          className="disabled:ring-none w-36 rounded-3xl px-4 py-2 text-sm ring-1 hover:font-bold  disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
