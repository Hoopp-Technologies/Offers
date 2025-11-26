import React from "react";

interface ProductImageProps {
  imageUrls: string[];
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrls, title }) => {
  return (
    <div className="mb-8 max-w-3xs">
      <img
        src={imageUrls[0]}
        alt={title}
        className="w-full h-auto object-cover rounded-lg shadow-md min-h-96"
      />
      <div className="grid grid-cols-3 mt-3.5 gap-[9px]">
        {imageUrls
          ?.filter((_, index) => index !== 0)
          .map((imageUrl, index) => (
            <img src={imageUrl} alt="" className="rounded-lg" key={index} />
          ))}
      </div>
    </div>
  );
};

export default ProductImage;
