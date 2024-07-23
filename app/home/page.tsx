import clsx from 'clsx';
import { Carousel } from '@/components/carousel';
import { Poppins, Playfair_Display } from 'next/font/google';
import { CategoryMenu } from '@/components/categories/menu';
import api from '@/lib/api';
import { FeatureProductCard } from '@/components/products/card';
import { IProduct } from '@/lib/definitions';
import { Icon } from '@/components/icon';
import {
  faBackwardStep,
  faCoins,
  faLock,
  faMoneyBill,
  faPhone,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryList } from '@/components/category';
import { TrendingList } from '@/components/products/trending';
import Image from 'next/image';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/shop',
    label: 'Shop',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
];

const banners = [
  '/static/banners/2.jpg',
  '/static/banners/3.png',
  '/static/banners/4.jpg',
  '/static/banners/5.jpg',
  '/static/banners/6.jpg',
  '/static/banners/7.jpg',
  '/static/banners/8.jpg',
  '/static/banners/9.jpg',
];

export default async function Page() {
  const products = await fetchProductList();

  return (
    <main className="flex h-auto min-h-0 w-full flex-col">
      {/*Category and Banner */}
      <Carousel urls={banners} />

      <div className={'mt-20 flex w-full flex-col justify-center gap-4'}>
        <div
          className={clsx(
            playfair.className,
            'text-center text-[33px] font-bold tracking-widest text-[#3a4352]',
          )}
        >
          Featured Products
        </div>
        <div className="mx-auto w-[100px] border border-primary"></div>
        <div className="flex flex-row flex-wrap justify-around gap-4">
          <TrendingList />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Image
          src={'/static/banners/7.jpg'}
          width={600}
          height={400}
          className="my-10 w-full"
          alt=""
        />
        <Image
          src={'/static/banners/5.jpg'}
          width={600}
          height={400}
          className="my-10 w-full"
          alt=""
        />
      </div>

      <div className={'mt-20 mt-5 flex w-full flex-col justify-center gap-4'}>
        <div
          className={clsx(
            playfair.className,
            'text-center text-[33px] font-bold tracking-widest text-[#3a4352]',
          )}
        >
          Categories
        </div>
        <div className="mx-auto w-[100px] border border-primary"></div>
        <CategoryList />
      </div>

      <Image
        src={'/static/banners/1.png'}
        width={600}
        height={400}
        className="my-10 w-full"
        alt=""
      />
      <div
        className={clsx(
          playfair.className,
          'text-center text-[33px] font-bold tracking-widest text-[#3a4352]',
        )}
      >
        Why choose us
      </div>
      <div className="mx-auto w-[100px] border border-primary"></div>
      <div className=" my-5 flex flex-row justify-around bg-white px-2 py-10">
        <div className="flex flex-row gap-4">
          <Icon icon={faCoins} className="text-[60px] text-primary" />
          <div className="flex flex-col gap-2">
            <div className="flex-1 font-semibold tracking-wide">
              Free shipping
            </div>
            <div className="flex-1 text-sm">Order over $10</div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Icon icon={faShoppingBag} className="text-[60px] text-primary" />
          <div className="flex flex-col gap-2">
            <div className="flex-1 font-semibold tracking-wide">
              30 Days Return
            </div>
            <div className="flex-1 text-sm">If goods have problem</div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Icon icon={faLock} className="text-[60px] text-primary" />
          <div className="flex flex-col gap-2">
            <div className="flex-1 font-semibold tracking-wide">
              Secure Payment
            </div>
            <div className="flex-1 text-sm">100% secure payment</div>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Icon icon={faPhone} className="text-[60px] text-primary" />
          <div className="flex flex-col gap-2">
            <div className="flex-1 font-semibold tracking-wide">
              24h Support
            </div>
            <div className="flex-1 text-sm">Dedicated support</div>
          </div>
        </div>
      </div>
    </main>
  );
}
async function fetchProductList(): Promise<IProduct[] | any> {
  try {
    const resp = (await api('/api/products')) as IProduct[];
    return resp;
  } catch (error) {
    return [];
  }
}
