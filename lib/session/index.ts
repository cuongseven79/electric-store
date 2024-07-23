import { cookies } from 'next/headers';
import crypto from 'crypto-js';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/auth';

const key = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'default-key';

export function encrypt(text: any) {
  return crypto.AES.encrypt(text, key).toString();
}

export function decrypt(text: any) {
  return crypto.AES.decrypt(text, key).toString(crypto.enc.Utf8);
}

// Deprecated
export async function getUserSession() {
  return await getServerSession(authOptions);
}

export async function getReqSession(req) {
  return await getServerSession(authOptions);
}
