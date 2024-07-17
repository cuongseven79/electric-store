import api from '@/lib/api';
import { Poppins, Playfair_Display } from 'next/font/google';
import { NavBar } from '@/components/navbar';
import { ProductImages } from '@/components/productImages';
import { IFeedBack, IProduct } from '@/lib/definitions';
import { Add } from '@/components/cartbutton';
import { VND } from '@/lib/currency';
import { LookingSimilar } from 'react-instantsearch';
import { RecommendList } from '@/components/recommendlist';
import { Rate } from 'antd';

export default async function Page({ params }: { params: { id: string } }) {
  const product = (await fetchProductByID(params.id)) as IProduct;
  const rate =
    product.feedbacks.reduce((prev, cur) => {
      return prev + cur.rate;
    }, 0) / product.feedbacks?.length || 0;

  return (
    <main className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-row">
        {/* IMG */}
        <ProductImages items={product.assets} />
        {/* TEXTS */}
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>

          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-1">
            <Rate style={{ fontSize: 16 }} value={rate} />
            <span>({product.feedbacks?.length})</span>
          </div>
          <div className="h-[2px] bg-gray-100" />
          {product.price == product.price ? (
            <h2 className="text-2xl font-medium">
              {VND(product.price).format()}
            </h2>
          ) : (
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-gray-500 line-through">
                {VND(product.price).format()}
              </h3>
              <h2 className="text-2xl font-medium">${product.price}</h2>
            </div>
          )}
          <Add productId={product.id} stockNumber={product.quantity || 0} />
          <div className="h-[2px] bg-gray-100" />

          {/* REVIEWS */}
          <h1 className="text-2xl">User Reviews</h1>
          <div className="max-h-[400px] overflow-auto">
            {product.feedbacks.map((v: IFeedBack) => (
              <div key={v.id} className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-3">
                  <img
                    src={v.user?.image || ''}
                    className="h-[40px] w-[40px] rounded-full"
                  />

                  <div className="flex w-full flex-col">
                    <div className="text-xs">{v.user.name}</div>
                    <div className="text-xs">
                      <Rate style={{ fontSize: 10 }} value={v.rate} />
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-sm">{v.review}</div>
                <div className="mb-2 h-[2px] bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col">
        <div className="my-2 h-[2px] bg-gray-100" />
        {product.blogs.length > 0 && (
          <div
            dangerouslySetInnerHTML={{ __html: product.blogs[0].content || '' }}
          ></div>
        )}
      </div>
      <div>
        <h1 className="mt-10 text-2xl">Similar</h1>
        <RecommendList productID={product.id} />
      </div>
    </main>
  );
}

async function fetchProductByID(id: string): Promise<IProduct | any> {
  try {
    const resp = (await api(`/api/products/${id}`)) as IProduct;
    return resp;
  } catch (error) {
    console.log(error);
  }
}
