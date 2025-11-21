import React from 'react';
import type { Product } from '../../../utils/schema';
import ProductCard from './ProductCard';
import cake from "@/assets/cake.png"
const mockOffers: Product[] = [
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
];

const MoreOffers: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2">More offers by same vendor</h2>
        <p className="text-gray-600 mb-6">Interested in this vendor? check out more of their offers</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mockOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreOffers;