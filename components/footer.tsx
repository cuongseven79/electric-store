import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="xl:32 mt-24 block  bg-gray-100 px-4 py-24 text-sm md:px-8 lg:px-16 2xl:px-64">
      {/* TOP */}
      <div className="flex flex-col justify-between gap-24 md:flex-row">
        {/* LEFT */}
        <div className="flex w-full flex-col gap-8 md:w-1/2 lg:w-1/4">
          <Link href="/">
            <div className="text-2xl tracking-wide">Shop</div>
          </Link>
          <p>600 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ</p>
          <span className="font-semibold">hello@dev</span>
          <span className="font-semibold">+84 234 567 890</span>
          <div className="flex gap-6">
            <Image src="/static/facebook.png" alt="" width={16} height={16} />
            <Image src="/static/instagram.png" alt="" width={16} height={16} />
            <Image src="/static/youtube.png" alt="" width={16} height={16} />
            <Image src="/static/pinterest.png" alt="" width={16} height={16} />
            <Image src="/static/x.png" alt="" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden w-1/2 justify-between lg:flex">
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-medium">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="">About Us</Link>
              <Link href="">Careers</Link>
              <Link href="">Affiliates</Link>
              <Link href="">Blog</Link>
              <Link href="">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-medium">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">New Arrivals</Link>
              <Link href="">Accessories</Link>
              <Link href="">Men</Link>
              <Link href="">Women</Link>
              <Link href="">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-lg font-medium">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="">Customer Service</Link>
              <Link href="">My Account</Link>
              <Link href="">Find a Store</Link>
              <Link href="">Legal & Privacy</Link>
              <Link href="">Gift Card</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex w-full flex-col gap-8 md:w-1/2 lg:w-1/4">
          <h1 className="text-lg font-medium">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="w-3/4 p-4"
            />
            <button className="bg-lama w-1/4 text-white">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <Image src="/static/discover.png" alt="" width={40} height={20} />
            <Image src="/static/skrill.png" alt="" width={40} height={20} />
            <Image src="/static/paypal.png" alt="" width={40} height={20} />
            <Image src="/static/mastercard.png" alt="" width={40} height={20} />
            <Image src="/static/visa.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="mt-16 flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="">© 2024 Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="mr-4 text-gray-500">Language</span>
            <span className="font-medium">English</span>
          </div>
          <div className="">
            <span className="mr-4 text-gray-500">Currency</span>
            <span className="font-medium">VND</span>
          </div>
        </div>
      </div>
    </div>
  );
};
