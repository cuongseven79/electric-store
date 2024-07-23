'use client';
import { useCart } from '@/contexts/cart';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Page() {
  const { clearCart, isLoading } = useCart();

  useEffect(() => {
    clearCart();
  }, [isLoading]);
  return (
    <div className="flex h-full w-full flex-col items-center">
      <img src="/static/success-payment.png" className="h-[200px] w-[200px]" />
      <h1 className="text-[30px] font-bold">Your payment was successful</h1>
      <p className="text-gray-500">
        Thank you for you payment. We will be in contact with more detail
        shortly
      </p>
      <Link href="/shop" className="mt-2 underline">
        Continue shopping
      </Link>
    </div>
  );
}
