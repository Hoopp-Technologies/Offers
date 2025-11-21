import React from "react";

interface ProductImageProps {
  imageUrl: string;
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="mb-8 max-w-3xs">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto object-cover rounded-lg shadow-md min-h-96"
      />
      <div className="grid grid-cols-3 mt-3.5 gap-[9px]">
        <img src={imageUrl} alt="" className="rounded-lg"/>
        <img src={imageUrl} alt="" className="rounded-lg"/>
        <img src={imageUrl} alt="" className="rounded-lg"/>
      </div>
    </div>
  );
};

export default ProductImage;
