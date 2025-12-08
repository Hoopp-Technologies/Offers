import type { DiscountType } from "../products/types";

export type ProfileData = {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  addresses: addressType[];
};

export type addressType = {
  id: 1;
  country: string;
  province: string;
  location: string;
  zipCode: string;
  isPrimary: boolean;
};

export type PurchaseHistoryData = {
  content: PurchaseHistoryItem[];
  page: Pagination;
};

export type PurchaseHistoryItem = {
  offerId: string;
  offerName: string;
  offerEndDate: string;
  price: {
    currencyCode: string;
    originalPrice: number;
    discountedPrice: number;
    discountType: string;
    discountValue: number;
  };
  discountType: string;
  discountValue: number;
  soldBy: string;
  voucherCode: string;
  status: string;
  quantityBought: number;
  category: string;
  imageUrls: string[];
};

export type Pagination = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

export type TransactionData = {
  offerId: string;
  offerName: string;
  offerEndDate: string;
  actualPrice: number;
  discountedPricePaid: number;
  discountType: DiscountType;
  discountValue: number;
  voucherCode: string;
  quantityBought: number;
  category: string;
  brandName: string;
  imageUrls: string[];
};
