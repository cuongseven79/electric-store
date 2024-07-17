'use client';
import api from '@/lib/api';
import { redirect, useRouter } from 'next/navigation';

export function MarkShippedButton({ id }: { id: number }) {
  const router = useRouter();
  async function markDone(id: number) {
    try {
      await api(`/api/orders/${id}`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.back();
    }
  }
  return (
    <button
      onClick={() => markDone(id)}
      className="disabled:ring-none w-36 rounded-3xl px-4 py-2 text-sm ring-1 hover:bg-blue-200 hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0"
    >
      Mark as Shipped
    </button>
  );
}
