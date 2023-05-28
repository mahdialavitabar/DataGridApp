import {useMutation, UseMutationOptions, useQuery, UseQueryOptions} from "react-query";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

interface QueryOptions<T> extends UseQueryOptions<AxiosResponse<T>, AxiosError> {
    url: string;
    method?: 'get' | 'put' | 'delete';
}

interface MutationOptions<T, U extends AxiosRequestConfig>
    extends UseMutationOptions<AxiosResponse<T>, AxiosError, U, unknown> {
    url: string;
    method?: 'post' | 'put' | 'delete';
}

export function useDynamicQuery<T>(options: QueryOptions<T>) {
    const { url, method = 'get', ...queryOptions } = options;
    return useQuery<AxiosResponse<T>, AxiosError>(
        url,
        () => axios[method](url),
        queryOptions
    );
}

export function useDynamicMutation<T, U extends AxiosRequestConfig>(options: MutationOptions<T, U>) {
    const { url, method = 'post', ...mutationOptions } = options;
    return useMutation<AxiosResponse<T>, AxiosError, U>(
        (data: U) => axios[method](url, { ...data }),
        mutationOptions
    );
}