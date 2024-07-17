import api from '@/lib/api';
import { ICategory } from '@/lib/definitions';
import clsx from 'clsx';
import Link from 'next/link';

export async function CategoryMenu({
  searchParams,
}: {
  searchParams?: { category: string };
}) {
  const categories = await fetchList();
  return (
    <main className="flex-1">
      <table className="w-full border-2 border-[#f2f5fc] text-sm">
        <thead className="bg-[#f2f5fc]">
          <tr>
            <th className="px-3 py-2 text-left">Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c: ICategory) => (
            <tr key={c.id}>
              <td
                className={clsx(
                  searchParams?.category == c.id && 'font-semibold',
                  'px-3 py-2  hover:bg-[#f2f5fc]',
                )}
              >
                <Link href={`/shop?category=${c.id}`}>{c.name}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

async function fetchList(): Promise<ICategory[] | any> {
  try {
    const resp = (await api('/api/categories')) as ICategory[];
    return resp;
  } catch (error) {
    return [];
  }
}
