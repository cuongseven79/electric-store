import NextAuth, { DefaultSession } from 'next-auth';
import type { Session, Account } from 'next-auth';
import { NextResponse, type NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    user?: DefaultSession['user'];
  } & NextRequest;
}
