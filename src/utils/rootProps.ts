

import type { PropTypes } from './schema';

// Root component props interface
export interface ProductListingPageProps extends PropTypes {
  onCategorySelect?: (category: string) => void;
  onSortChange?: (sortOption: string) => void;
  onSearchChange?: (searchTerm: string) => void;
  onLoadMore?: () => void;
  onProductClick?: (productId: string) => void;
}

