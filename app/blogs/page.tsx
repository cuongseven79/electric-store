import api from '@/lib/api';
import { IBlog } from '@/lib/definitions';
import Link from 'next/link';

export default async function Page() {
  const { data } = await fetch();
  return (
    <div className="grid grid-cols-3 gap-3">
      {data &&
        data.map((v: IBlog) => (
          <Link
            key={v.id}
            className="flex h-[400px] w-[300px] flex-col rounded  border shadow"
            href={`/blogs/${v.id}`}
          >
            <img
              className="h-[50%] w-full bg-gray-100 object-contain"
              alt="no-image"
              src={v.imageUrl || ''}
            />
            <div className="flex h-full flex-col justify-between p-2">
              <div className="flex  flex-col ">
                <div className="text-md font-bold">{v.title}</div>
                <div className="text-sm text-gray-400">
                  {v.content
                    .replace(/<[^>]*>?/gm, '')
                    .split(' ')
                    .slice(0, 10)
                    .join(' ')}
                </div>
              </div>

              <div className="text-md  text-right">{'...Read more'}</div>
            </div>
          </Link>
        ))}
    </div>
  );
}

async function fetch(): Promise<IBlog[] | any> {
  try {
    const resp = (await api('/api/public/blogs')) as IBlog[];
    return resp;
  } catch (error) {
    return [];
  }
}
