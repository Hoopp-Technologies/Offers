import React from "react";
import { X } from "lucide-react";
import useFilterStore from "@/store/filter";

const AppliedFilters: React.FC = () => {
  const {
    category: selectedCategory,
    setCategory,
    minPrice,
    maxPrice,
    discountType,
    offerDuration,
    setMinPrice,
    setMaxPrice,
    setDiscountType,
    setOfferDuration,
    setIsApplied,
  } = useFilterStore((state) => state);

  // Get applied filters
  const appliedFilters: { field: string; value: string; clear: () => void }[] =
    [];

  if (minPrice) {
    appliedFilters.push({
      field: "Min Price",
      value: minPrice,
      clear: () => {
        setMinPrice("");
        setIsApplied(true);
      },
    });
  }

  if (maxPrice) {
    appliedFilters.push({
      field: "Max Price",
      value: maxPrice,
      clear: () => {
        setMaxPrice("");
        setIsApplied(true);
      },
    });
  }

  if (selectedCategory) {
    appliedFilters.push({
      field: "Category",
      value: selectedCategory,
      clear: () => {
        setCategory("");
        setIsApplied(true);
      },
    });
  }

  if (discountType) {
    appliedFilters.push({
      field: "Discount Type",
      value: discountType,
      clear: () => {
        setDiscountType("");
        setIsApplied(true);
      },
    });
  }

  if (offerDuration) {
    appliedFilters.push({
      field: "Offer Duration",
      value: offerDuration,
      clear: () => {
        setOfferDuration("");
        setIsApplied(true);
      },
    });
  }

  // Don't render if no filters are applied
  if (appliedFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-3 border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-600">
            Applied Filters:
          </span>
          {appliedFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-3 py-1.5 text-sm"
            >
              <span className="font-medium text-gray-700">{filter.field}:</span>
              <span className="text-gray-600">{filter.value}</span>
              <button
                onClick={filter.clear}
                className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                aria-label={`Remove ${filter.field} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppliedFilters;
