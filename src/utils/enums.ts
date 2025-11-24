// Enums for product listing page

export const ProductCategory = {
  CONFECTIONARIES: "Confectionaries",
  FOOD_DINING: "Food & dinning",
  BEAUTY_WELLNESS: "Beauty & wellness",
  ELECTRONICS_TECH: "Electronics & tech",
  EXPERIENCES: "Experiences",
  DIGITAL_PRODUCTS: "Digital products",
  HOSPITALITY: "Hospitality",
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];

export const BadgeType = {
  BESTSELLER: "Bestseller",
  TIME_LIMITED: "22 hrs left",
} as const;

export type BadgeType = (typeof BadgeType)[keyof typeof BadgeType];

export const SortOption = {
  POPULARITY: "Popularity",
  NEWEST: "Newest",
  HIGHEST_DISCOUNT: "Highest discount",
  LOWEST_PRICE: "Lowest price",
  EXPIRING_SOON: "Expiring soon",
} as const;

export type SortOption = (typeof SortOption)[keyof typeof SortOption];
