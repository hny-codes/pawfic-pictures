import useSWR, { Fetcher } from 'swr';

type RandomDog = {
  message: string;
  status: string;
};

const API_CALL = 'https://dog.ceo/api/breeds/image/random';
const fetcher: Fetcher<RandomDog> = (query: string) =>
  fetch(query).then((res) => res.json());

export const useRandomDog = () => {
  const { data, error, isLoading, mutate } = useSWR(API_CALL, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  };
};
