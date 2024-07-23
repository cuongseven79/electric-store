import api from '@/lib/api';
import NextAuth, { User, NextAuthConfig, AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any | null> {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const res = await api('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (res?.message) {
            throw new Error('Login Failed');
          }

          if (res) {
            return res;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  // debug: true,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user = { ...session.user, ...token };
        session.token = token.accessToken;
        // session.provider = token.provider;
        session.user.role = token.role;
        session.user.name = token.fullname || token.name;
        session.user.image = token.image || token.picture;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (account?.provider && account.provider === 'google') {
        token.role = 'USER';
        token.accessToken = account.access_token; // Store access token in JWT
      }

      return { ...token, ...user, ...profile };
    },
  },
};
