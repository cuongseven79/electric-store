import NextAuth, { DefaultSession } from 'next-auth';
import type { Session, Account } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    token?: accessToken;
    provider?: string;
    user: {
      token?: accessToken;
      role?: string;
    } & DefaultSession['user'];
  }
  interface Account {
    access_token: accessToken;
    user: {
      token?: accessToken;
      role?: string;
    } & DefaultSession['user'];
  }
  interface JWT {
    role?: string;
  } & JWT
}
