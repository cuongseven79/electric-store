'use client';
import { useCart } from '@/contexts/cart';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Page() {
  const searchParam = useSearchParams();
  const { addCart, isLoading, cart } = useCart();

  const handle = useDebouncedCallback(() => {
    const itemID = parseInt(searchParam.get('item') || '');
    if (!itemID) return;
    addCart(itemID, 1);
  }, 1000);

  useEffect(() => {
    handle();
  }, []);
  return (
    <div className="min-h-[100vh]">
      {isLoading ? (
        <div className="font-bold text-[40x]">Your cart is updating...</div>
      ) : (
        <>
          <div className="font-bold text-[40x]">
            Your cart has been updated.
          </div>
          <Link href="/shop" className="h1 underline">
            Click here to continue shopping
          </Link>
        </>
      )}
    </div>
  );
}
