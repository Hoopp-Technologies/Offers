import type { UseBaseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { createApiRequest } from "./createApiRequest";

const keysToRemoveFromQueryKey = ["sort_ascending"];

export interface definitionOptions {
  key: ((arg: string) => string[]) | string[];
  url: string;
  options?: Partial<UseBaseQueryOptions>;
}

export interface usageOptions<TData> {
  queryParams?: Record<string, string | number>;
  enabled?: boolean;
  path?: string;
  onSuccess?: (data: TData, ...args: Record<string, unknown>[]) => void;
}

export const createQuery = <TData, TError = Error>(
  definitionOptions: definitionOptions
) => {
  const useQueryFn = (usageOptions?: usageOptions<TData>) => {
    if (!usageOptions) {
      usageOptions = {};
    }

    const { url, key } = definitionOptions;
    const { queryParams = {}, path, ...rest } = usageOptions;
    let fullUrl = url;
    if (path) {
      fullUrl = url + (url.length > 0 ? "/" : "") + path;
    }
    
    const mergeOptions = {
      ...definitionOptions.options,
      ...rest, //usage options
    };

    const transformedFilters = transformFiltersToKey(queryParams);

    const params = queryParams ? qs.stringify(queryParams) : "";
    const keyParams = transformedFilters
      ? qs.stringify(transformedFilters)
      : "";

    const queryKey = typeof key === "function" ? key(keyParams) : key;

    return useQuery({
      queryKey,
      queryFn: () =>
        createApiRequest<TData>({
          url: fullUrl,
          queryParams: params,
          method: "GET",
        }),
      ...mergeOptions,
    }) as ReturnType<typeof useQuery<TData, TError>>;
  };

  return useQueryFn;
};

const transformFiltersToKey = (filters: Record<string, string | number>) => {
  keysToRemoveFromQueryKey.forEach((key) => {
    delete filters[key];
  });
  return filters;
};
