import { create } from "zustand";

type FilterStore = {
  search: string;
  minPrice: string;
  maxPrice: string;
  discountType: string;
  category: string;
  endingInDays: string;
  offerDuration: string;
  isApplied: boolean;
  setSearch: (search: string) => void;
  setMinPrice: (minPrice: string) => void;
  setMaxPrice: (maxPrice: string) => void;
  setDiscountType: (discountType: string) => void;
  setCategory: (category: string) => void;
  setEndingInDays: (endingInDays: string) => void;
  setOfferDuration: (offerDuration: string) => void;
  setIsApplied: (isApplied: boolean) => void;
};

const useFilterStore = create<FilterStore>((set) => ({
  search: "",
  minPrice: "",
  maxPrice: "",
  discountType: "",
  category: "",
  endingInDays: "",
  offerDuration: "",
  isApplied: false,
  setSearch: (search: string) => set({ search }),
  setMinPrice: (minPrice: string) => set({ minPrice }),
  setMaxPrice: (maxPrice: string) => set({ maxPrice }),
  setDiscountType: (discountType: string) => set({ discountType }),
  setCategory: (category: string) => set({ category }),
  setEndingInDays: (endingInDays: string) => set({ endingInDays }),
  setOfferDuration: (offerDuration: string) => set({ offerDuration }),
  setIsApplied: (isApplied: boolean) => set({ isApplied }),
}));

export default useFilterStore;
