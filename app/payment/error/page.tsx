import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <img src="/static/error-payment.png" className="h-[200px] w-[200px]" />
      <h1 className="text-[30px] font-bold">Your payment was failed</h1>
      {/* <p className="text-gray-500"> */}
      {/*   Thank you for you payment. We will be in contact with more detail */}
      {/*   shortly */}
      {/* </p> */}
      <Link href="/shop" className="mt-2 underline">
        Continue shopping
      </Link>
    </div>
  );
}
