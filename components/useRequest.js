// components/useRequest.js
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const fetcher = (url) => fetch(url).then((res) => res.json());

const url = 'https://aout.septembre.io/postsbis';

export const useGetPosts = () => {
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};

export const usePaginatePosts = () => {
  const ITEMS_PER_PAGE = 5;

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${url}?offset=${index + 1}&items_per_page=${ITEMS_PER_PAGE}`,
    fetcher
  );

  const posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < ITEMS_PER_PAGE);

  return { posts, error, isLoadingMore, size, setSize, isReachingEnd };
};
