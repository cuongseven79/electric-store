import { NextResponse, type NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { IProduct } from '@/lib/definitions';
import { algoIndex } from '@/lib/algolia';

export async function GET(req: NextRequest) {
  try {
    const list = await db.product.findMany({
      include: { assets: true, category: true },
    });

    console.log(
      'Adding record to index ',
      process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
    );
    await algoIndex.replaceAllObjects(
      list.map((v) => ({ objectID: v.id, ...v })),
    );

    return NextResponse.json({ message: 'Done' }, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
