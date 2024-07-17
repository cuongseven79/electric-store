'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Carousel({ urls }: { urls: string[] }) {
  const [currentIndexBanner, setCurrentIndexBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndexBanner((prev) =>
        prev === urls.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const _handlePrev = () => {
    setCurrentIndexBanner((prev) => (prev === 0 ? urls.length - 1 : prev - 1));
  };

  const _handleNext = () => {
    setCurrentIndexBanner((prev) => (prev === urls.length - 1 ? 0 : prev + 1));
  };
  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden md:h-96">
        {urls.map((banner, idx) => (
          <div
            key={idx}
            className={clsx(
              'duration-700 ease-in-out',
              idx === currentIndexBanner ? 'opacity-100' : 'opacity-0',
            )}
            data-carousel-item
          >
            <Image
              key={idx}
              src={banner}
              width={600}
              height={400}
              className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
              alt="..."
            />
          </div>
        ))}
      </div>
      <button
        onClick={_handlePrev}
        type="button"
        className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        onClick={_handleNext}
        type="button"
        className="group absolute end-0 top-0 z-20 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
          <svg
            className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
