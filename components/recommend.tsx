// @ts-nocheck
'use client';

import { algoClient } from '@/lib/algolia';
import { useSession } from 'next-auth/react';
import { Configure } from 'react-instantsearch';
import { InstantSearch } from 'react-instantsearch';
import { useEffect } from 'react';

export function RecommendProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  useEffect(() => {
    if (session && session.user)
      window.aa('setAuthenticatedUserToken', `${session?.user.id}`);
    window.aa('setUserToken', `${session?.user.id}`);
  }, [session]);
  return (
    <InstantSearch
      indexName="ecommerce"
      searchClient={algoClient}
      insights={{ useCookie: false }}
    >
      <Configure hitsPerPage={20} clickAnalytics={true} />
      {children}
    </InstantSearch>
  );
}
