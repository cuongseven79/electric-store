import { throws } from 'assert';
import { getSession, useSession } from 'next-auth/react';
import { ZodError, ZodIssue } from 'zod';

export type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export default async function api(
  input: RequestInfo | URL,
  init?: RequestInit,
  token?: string,
): Promise<any | ErrorResponse> {
  let cfg: RequestInit = { ...init, cache: 'no-store' };
  if (token) {
    cfg = { ...cfg, headers: { Authorization: `Bearer ${token}` } };
  }
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, cfg);

    const data = await resp.json();
    if (!resp.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (e) {
    throw Error(e);
  }
}
