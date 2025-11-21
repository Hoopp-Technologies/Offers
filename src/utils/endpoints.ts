

import type { Product } from './schema';

// Query-related hooks and endpoints
export interface QueryAPI {
  useProductsQuery: (params: {
    category?: string;
    sortBy?: string;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }) => {
    data: Product[] | undefined;
    isLoading: boolean;
    error: Error | null;
    hasNextPage: boolean;
    fetchNextPage: () => void;
  };
  
  useProductQuery: (productId: string) => {
    data: Product | undefined;
    isLoading: boolean;
    error: Error | null;
  };
}

