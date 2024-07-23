import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { getUserSession } from './session';
import { cookies } from 'next/headers';
 import { headers } from "next/headers"

export async function apiSSR(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<any> {
  let cfg: RequestInit = {
    ...init,
    cache: 'no-store',
    headers:new Headers(headers()),
  };
  return new Promise((resolve, reject: (reason: any) => void) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/${input}`, cfg).then(
      async (response) => {
        const responseData = await response.json();
        if (!response.ok) {
          return reject(responseData);
        }
        resolve(responseData);
      },
    );
  });
}
