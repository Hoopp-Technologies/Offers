import React from "react";
import { SearchIcon } from "../../../components/icons"; // Adjust path as needed

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-40">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center">
        {/* Left Content */}
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            Find the best offers and discounts online
          </h1>
          <p className="text-lg text-gray-600 mb-16 text-center">
            Shop exclusive deals from your favorite brands. Save more,
            instantly.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search deals and offers"
              className="w-full py-3 pl-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
