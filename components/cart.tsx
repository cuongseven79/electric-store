'use client';
import { useCart } from '@/contexts/cart';
import { useState } from 'react';
import { ICartItem, IProduct } from '@/lib/definitions';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Empty } from 'antd';
import { VND } from '@/lib/currency';

const CartModal = () => {
  const { data: session, status } = useSession();
  const {
    cart,
    total,
    isLoading,
    removeCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div className=" absolute right-0 top-5 z-30 hidden w-max flex-col gap-6 rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] group-hover:flex">
      {cart.length == 0 ? (
        <Empty />
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.map(
              (item: ICartItem) =>
                item.product && (
                  <div className="flex gap-4" key={item.productId}>
                    {item.product?.assets && (
                      <img
                        src={item.product.assets[0].url}
                        alt=""
                        width={72}
                        height={96}
                        className="rounded-md object-cover"
                      />
                    )}
                    <div className="flex w-full flex-col justify-between">
                      {/* TOP */}
                      <div className="">
                        {/* TITLE */}
                        <div className="flex items-center justify-between gap-8">
                          <h3 className="font-semibold">
                            {item.product?.name}
                          </h3>
                          <div className="flex items-center gap-2 rounded-sm bg-gray-50 p-1">
                            {item.quantity && item.quantity > 1 && (
                              <div className="text-green-500 text-xs">
                                {item.quantity} x{' '}
                              </div>
                            )}
                            {VND(item.product?.price).format()}
                          </div>
                        </div>
                        {/* DESC */}
                      </div>
                      {/* BOTTOM */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex w-20 items-center justify-between rounded-3xl bg-gray-100 px-4 py-2">
                          <button
                            className="text-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => decreaseQuantity(item.productId)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className="text-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
                            onClick={() => increaseQuantity(item.productId)}
                            disabled={item.quantity === item.product?.quantity}
                          >
                            +
                          </button>
                        </div>
                        <span
                          className="text-blue-500"
                          style={{
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                          }}
                          onClick={() => removeCart(item.productId)}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">{VND(total).format()}</span>
            </div>
            <p className="mb-4 mt-2 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              {status === 'authenticated' ? (
                <Link
                  href={'/cart'}
                  className="rounded-md bg-[black] px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-75"
                >
                  Checkout
                </Link>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="rounded-md bg-black px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-75"
                >
                  Login to checkout
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
