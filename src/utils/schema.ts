

// Props types (data passed to components)
export interface Product {
  id: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  boughtCount: number;
  category: string;
  badgeType: string;
  imageUrl: string;
  description?: string;
}

export interface PropTypes {
  products: Product[];
  categories: string[];
  sortOptions: string[];
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
}

