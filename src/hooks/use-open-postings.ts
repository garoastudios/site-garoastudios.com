import { useQuery } from '@tanstack/react-query';
import { fetchOpenPostings } from '@/lib/postings';

/** Postings currently listed on the public jobs page. */
export function useOpenPostings() {
  return useQuery({
    queryKey: ['open-postings'],
    queryFn: fetchOpenPostings,
    staleTime: 60_000,
  });
}
