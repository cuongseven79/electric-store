'use client';
import { Avatar, Badge, Breadcrumb, Space } from 'antd';

import Search from './search';
import clsx from 'clsx';
import { Poppins, Playfair_Display } from 'next/font/google';
import { useCart } from '@/contexts/cart';
import Link from 'next/link';
import CartModal from './cart';
import { Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  faBook,
  faBox,
  faCartShopping,
  faCoffee,
  faCog,
  faCreditCard,
  faFile,
  faHome,
  faHouseUser,
  faNewspaper,
  faShop,
  faShoppingCart,
  faSort,
  faUser,
  faUserCircle,
  faUsers,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';

import { Icon } from './icon';
import { GoogleCircleFilled } from '@ant-design/icons';
import UserInfoModal from './user';
import { Footer } from './footer';
import { SearchBox } from 'react-instantsearch';
import Image from 'next/image';

const publicNav = [
  {
    href: '/home',
    label: 'Home',
    icon: <Icon icon={faHome} />,
  },
  {
    href: '/shop',
    label: 'Shop',
    icon: <Icon icon={faShop} />,
  },
  {
    href: '/blogs',
    label: 'Blogs',
    icon: <Icon icon={faNewspaper} />,
  },
];

const staffNav = [
  {
    href: '/admin/dashboard',
    label: 'Admin dashboard',
    icon: <Icon icon={faHome} />,
  },
  {
    href: '/admin/staffs',
    label: 'Staff management',
    icon: <Icon icon={faUsersCog} />,
    specificRole: 'ADMIN',
  },
  {
    href: '/admin/products',
    label: 'Product management',
    icon: <Icon icon={faBox} />,
  },
  {
    href: '/admin/categories',
    label: 'Catoregory management',
    icon: <Icon icon={faBook} />,
  },
  {
    href: '/admin/orders',
    label: 'Order management',
    icon: <Icon icon={faCreditCard} />,
  },
  {
    href: '/admin/users',
    label: 'Customer management',
    icon: <Icon icon={faUsers} />,
  },
  {
    href: '/admin/blogs',
    label: 'Blog management',
    icon: <Icon icon={faNewspaper} />,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isCartShown, setCartShown] = useState(false);
  const [isProfileShown, setShownProfile] = useState(false);
  const [isUserInfoShown, setUserInfoShown] = useState(false);
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const { cart } = useCart();
  const isLogged = useMemo(() => status === 'authenticated', [status]);
  const isStaff = isLogged && session?.user.role != 'USER';

  useEffect(() => {
    if (!isProfileShown) return;
    setCartShown(!isProfileShown);
  }, [isProfileShown]);

  useEffect(() => {
    if (!isCartShown) return;
    setShownProfile(!isCartShown);
  }, [isCartShown]);

  const breadcrumbs = pathName
    .split('/')
    .slice(1)
    .map((text: string, index: number) => {
      text = capitalizeFirstLetter(text);
      var link = pathName
        .split('/')
        .slice(0, index + 2)
        .join('/');
      return { title: text, href: link };
    });

  if (isStaff) {
    return (
      <div className="flex h-full w-full flex-row p-2">
        {isUserInfoShown && <UserInfoModal handleToggle={setUserInfoShown} />}
        <nav className="mr-2 flex h-full  w-[300px] flex-col items-center justify-start border-r">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              Admin portal
            </span>
          </Link>
          <ul className="text-md mt-0 mt-10 flex flex-col items-center justify-start gap-1 ">
            <li className="flex flex-col items-center justify-start">
              {isLogged && session?.user.image ? (
                <Avatar src={session.user.image} />
              ) : (
                <Icon icon={faUserCircle} className="text-[20px]" />
              )}
              <div className={clsx('text-[16px] text-gray-500')}>
                Hi {session?.user.name}
              </div>
            </li>
            {staffNav.map((link) =>
              link.specificRole && link.specificRole != session?.user.role ? (
                <></>
              ) : (
                <li
                  key={link.href}
                  className={clsx(
                    pathName.startsWith(link.href) &&
                      'rounded-full bg-gray-100',
                    'w-full',
                  )}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      pathName.startsWith(link.href) && 'font-semibold ',
                      'flex w-full flex-row items-center justify-start gap-2 rounded-full p-2 transition-all  duration-300 ease-in-out hover:bg-gray-100',
                    )}
                  >
                    <div className={clsx('text-[20px]')}>{link.icon}</div>
                    <div
                      className={clsx(
                        pathName.startsWith(link.href)
                          ? 'text-gray-400'
                          : 'text-gray-500 ',
                        'hidden transition-all duration-700 ease-in-out  md:block',
                      )}
                    >
                      {link.label}
                    </div>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex h-full w-full flex-col">
          <div className="relative flex justify-between p-2">
            <div className="text-sm text-gray-400">
              {breadcrumbs.map((v, i) => (
                <Link key={i} href={v.href}>
                  {i !== 0 ? ' > ' + v.title : v.title}
                </Link>
              ))}
            </div>

            <button onClick={() => setShownProfile((v) => !v)}>
              {<Icon icon={faCog} />}
            </button>
            {isProfileShown && (
              <div className="absolute right-0 top-12 z-30 flex min-h-[100px] w-max min-w-[200px] max-w-[400px] flex-col gap-6 rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <div className="flex h-full w-full flex-col gap-2">
                  <div
                    className="flex w-full items-center gap-4 hover:cursor-pointer hover:bg-gray-50"
                    onClick={() => setUserInfoShown((v) => !v)}
                  >
                    <Icon icon={faUser} />
                    <span>Profile</span>
                  </div>
                  {!isStaff && (
                    <Link
                      href="/orders"
                      className="flex w-full items-center gap-4 hover:cursor-pointer hover:bg-gray-50"
                    >
                      <Icon icon={faShoppingCart} />
                      <span>My Orders</span>
                    </Link>
                  )}
                  <div className="w-full border-b" />
                  <button
                    className="text-[black m-2 flex items-center justify-center gap-2 border-2 border-black px-4 py-2"
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: '/' })
                    }
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="h-full w-full p-3">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center justify-start px-4 pt-1">
      <div className="relative mx-auto flex h-auto min-h-[100vh] w-full max-w-7xl flex-col items-start justify-between py-3">
        {isUserInfoShown && <UserInfoModal handleToggle={setUserInfoShown} />}
        <nav className="mx-auto flex h-auto w-full max-w-7xl flex-row items-center justify-between py-3">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={'/static/logo.jpg'}
              width={600}
              height={400}
              className="my-10 w-full"
              alt=""
            />
          </Link>
          <div className="xs:w-auto lg:w-[400px] ">
            <SearchBox />
            {/* <Search placeholder="Search product..." /> */}
          </div>
          <ul className="text-md mt-0 flex flex-row items-center justify-center gap-1 space-x-2 transition-all duration-300 ease-in-out ">
            {publicNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={clsx(
                    pathName.startsWith(link.href) && 'font-semibold',
                    ' group flex flex-row items-center justify-center gap-2 rounded-full p-2 transition-all  duration-300 ease-in-out hover:bg-gray-100',
                  )}
                >
                  <div className="text-[20px]">{link.icon}</div>
                  <div
                    className={clsx(
                      pathName.startsWith(link.href)
                        ? 'text-[14px]'
                        : 'text-[0px]',
                      'text-gray-500 transition-all duration-700 ease-in-out hover:transition-all group-hover:text-[16px]',
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <div className="h-5 border border-l-gray-50" />
            </li>
            <li className="group relative">
              <button
                className={clsx(
                  'font-semibold',
                  ' flex flex-row items-center justify-center gap-2 rounded-full p-2 transition-all  duration-300 ease-in-out hover:bg-gray-100',
                )}
              >
                <Badge count={cart.length || 0}>
                  <Icon icon={faCartShopping} className="text-[20px]" />
                </Badge>
                <div
                  className={clsx(
                    isCartShown ? 'text-[14px]' : 'text-[0px]',
                    'text-gray-500 transition-all duration-700 ease-in-out hover:transition-all group-hover:text-[16px]',
                  )}
                >
                  Your cart
                </div>
              </button>
              <CartModal />
            </li>
            <li className="relative">
              <button
                onClick={() => setShownProfile((v) => !v)}
                className={clsx(
                  isProfileShown && 'font-semibold',
                  ' group flex flex-row items-center justify-center gap-2 rounded-full p-2 transition-all  duration-300 ease-in-out hover:bg-gray-100',
                )}
              >
                {isLogged && session?.user.image ? (
                  <Avatar src={session.user.image} />
                ) : (
                  <Icon icon={faUserCircle} className="text-[20px]" />
                )}
                <div
                  className={clsx(
                    isProfileShown ? 'text-[14px]' : 'text-[0px]',
                    'text-gray-500 transition-all duration-700 ease-in-out hover:transition-all group-hover:text-[16px]',
                  )}
                >
                  Hi {session?.user.name}
                </div>
              </button>
              {isProfileShown && (
                <div className="absolute right-0 top-12 z-30 flex min-h-[100px] w-max min-w-[200px] max-w-[400px] flex-col gap-6 rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  {isLogged ? (
                    <div className="flex h-full w-full flex-col gap-2">
                      <div
                        className="flex w-full items-center gap-4 hover:cursor-pointer hover:bg-gray-50"
                        onClick={() => setUserInfoShown((v) => !v)}
                      >
                        <Icon icon={faUser} />
                        <span>Profile</span>
                      </div>
                      <Link
                        href="/orders"
                        className="flex w-full items-center gap-4 hover:cursor-pointer hover:bg-gray-50"
                      >
                        <Icon icon={faShoppingCart} />
                        <span>My Orders</span>
                      </Link>
                      <div className="w-full border-b" />
                      <button
                        className="text-[black m-2 flex items-center justify-center gap-2 border-2 border-black px-4 py-2"
                        onClick={() =>
                          signOut({ redirect: true, callbackUrl: '/' })
                        }
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <button
                        className="m-2 flex items-center justify-center gap-2 border border-black px-4 py-2 text-black"
                        onClick={() => signIn('google')}
                      >
                        <GoogleCircleFilled />
                        <div className="ml-[2px]">Login</div>
                      </button>
                      <div className="text-gray-400">--- or ---</div>
                      <button
                        className="m-2 flex items-center justify-center gap-2 px-4 py-2 text-black"
                        onClick={() => signIn()}
                      >
                        <div className="ml-[2px]">Staff login</div>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {children}
      <Footer />
    </div>
  );
}

function capitalizeFirstLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
