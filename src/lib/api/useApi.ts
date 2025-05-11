import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions, type QueryKey, type MutationFunction } from "@tanstack/react-query";
import axios from "axios";
// import { useAppSelector } from "../../../../lib/hooks";

// fetch(`https://fakestoreapi.com/${path}`)
// .then(response => response.json())
// .then(data => console.log(data));

export const useApiQuery = <
  TData,
  TQueryKey extends QueryKey = QueryKey
>(
  key: TQueryKey,
  path: string,
  options?: UseQueryOptions<TData, Error, TData, TQueryKey>
) => {
  return useQuery<TData, Error, TData, TQueryKey>({
    queryKey: key,
    queryFn: async () => {
      const response = await axios.get<TData>(`https://fakestoreapi.com/${path}`);
      return response.data;
    },
    staleTime: 6000,
    ...options,
  });
};



// import { useMutation, UseMutationOptions } from "@tanstack/react-query";
// import { apiInstance } from "../../../../lib/api/Api";

export const useApiMutation = <
  T extends unknown,
  R = Record<string, unknown>
>(
  method: "post" | "put" | "delete" | "patch",
  path: string,
  options?: UseMutationOptions<T, unknown, R>
) => {

  const mutationFn: MutationFunction<T, R> = async (data: any) => {
     
    try {
       const response = await axios[method]<T>(`https://fakestoreapi.com/${path}`, data);
          return response.data ; // Ensure type compatibility
    } catch (error) {
       console.log(error, "Error from Mutation");
      throw error;
      
    }
  };

  return useMutation<T, unknown, R>({
    mutationFn,
    ...options,
  });
};

