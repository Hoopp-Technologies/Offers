import type { ProductData } from "@/services/products/types";

const OfferBanner = ({ product }: { product: ProductData }) => {
  return (
    <div className="bg-red-600 text-white text-center py-2 px-4 rounded-b-md mb-8 max-w-2xl mx-auto">
      <p className="font-bold">
        Shop Now!!!{" "}
        {product.orderQuantity > 0
          ? `Only ${product.orderQuantity} Offers to claim!!!`
          : ""}{" "}
      </p>
    </div>
  );
};

export default OfferBanner;
