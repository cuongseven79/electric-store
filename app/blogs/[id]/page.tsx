import api from '@/lib/api';
import { IBlog } from '@/lib/definitions';
import dayjs from 'dayjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: number } }) {
  const data = await fetch(params.id);
  if (!data) {
    redirect('/blogs');
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className=" text-4xl font-bold">{data.title}</div>
        <div className="text-sm text-gray-300">
          Created at: {dayjs(data.createdAt).format('HH:mm:ss DD-MM-YYYY')}{' '}
        </div>
      </div>
      <img
        className=" h-auto w-[50%] bg-gray-100 object-contain"
        alt="no-image"
        src={data.imageUrl || ''}
      />
      <div className="text-md ">
        <div dangerouslySetInnerHTML={{ __html: data.content || '' }}></div>
      </div>
    </div>
  );
}

async function fetch(id: number): Promise<IBlog | undefined> {
  try {
    const resp = await api(`/api/public/blogs/${id}`);
    return resp;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
