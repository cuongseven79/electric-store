import { verify } from 'crypto';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/token';
import { decode } from 'next-auth/jwt';

export default withAuth(
  async function middleware(req) {
    // Init
    const path = req.nextUrl.pathname;
    const token = await getToken({ req });

    const isAuth = !!token;
    const isStaff = token?.role === 'STAFF' || token?.role === 'ADMIN';

    const isAuthPage =
      path.startsWith('/api/login') || path.startsWith('/register');
    const isStaffPage = path.startsWith('/admin');
    const isPrivatePage = path.startsWith('/cart');

    // If user logged in, then redirect
    if (isAuthPage && isAuth) {
      if (isStaff && !isStaffPage) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      if (!isStaff && isStaffPage) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
    }

    if (!isAuth && (isPrivatePage || isStaffPage)) {
      let from = path;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(
          `/api/auth/signin?callbackUrl=${encodeURIComponent(from)}`,
          req.url,
        ),
      );
    }

    if (isAuth) {
      if (isStaff && !isStaffPage) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      if (!isStaff && isStaffPage) {
        return NextResponse.redirect(new URL('/home', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return true;
      },
    },
  },
);

async function verifyJWTRequest(req: NextRequestWithAuth) {
  const auth = req.headers.get('authorization');
  if (!auth?.toLowerCase().startsWith('bearer')) {
    return false;
  }
  const token = auth.split(' ').pop() || '';
  return await verifyToken(token);
}

export const config = {
  matcher: ['/((?!api|static|favicon.ico).*)'],
};
