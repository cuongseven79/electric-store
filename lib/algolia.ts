import algoliasearch from 'algoliasearch';
export const algoClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SECRET || '',
);
export const algoIndex = algoClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX || '',
);
