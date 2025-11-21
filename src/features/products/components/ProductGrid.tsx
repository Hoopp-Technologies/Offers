import React from 'react';
import type { Product } from '../../../utils/schema';
import ProductCard from './ProductCard';
import cake from "@/assets/cake.png"

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'December Cake Madness',
    currentPrice: 4000,
    originalPrice: 5000,
    discountPercentage: 20,
    boughtCount: 8,
    category: 'Confectionaries',
    badgeType: 'Bestseller',
    imageUrl: cake,
  },
  {
    id: '2',
    title: 'December Cake Madness',
    currentPrice: 4000,
    originalPrice: 5000,
    discountPercentage: 20,
    boughtCount: 8,
    category: 'Confectionaries',
    badgeType: '22 hrs left',
    imageUrl: cake,
  },
  {
    id: '3',
    title: 'December Cake Madness',
    currentPrice: 4000,
    originalPrice: 5000,
    discountPercentage: 20,
    boughtCount: 8,
    category: 'Confectionaries',
    badgeType: 'Bestseller',
    imageUrl: cake,
  },
  {
    id: '4',
    title: 'December Cake Madness',
    currentPrice: 4000,
    originalPrice: 5000,
    discountPercentage: 20,
    boughtCount: 8,
    category: 'Confectionaries',
    badgeType: '22 hrs left',
    imageUrl: cake,
  },
  {
    id: '5',
    title: 'December Cake Madness',
    currentPrice: 4000,
    originalPrice: 5000,
    discountPercentage: 20,
    boughtCount: 8,
    category: 'Confectionaries',
    badgeType: 'Bestseller',
    imageUrl: cake,
  },
  {
    id: '6',
    title: 'December Cake Madness',
    currentPrice: 4000,
    originalPrice: 5000,
    discountPercentage: 20,
    boughtCount: 8,
    category: 'Confectionaries',
    badgeType: '22 hrs left',
    imageUrl: cake,
  },
];

const ProductGrid: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;