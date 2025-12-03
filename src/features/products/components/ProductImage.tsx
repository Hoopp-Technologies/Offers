import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ProductImageProps {
  imageUrls: string[];
  title: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrls, title }) => {
  const [selectedUrl, setSelectedUrl] = useState(imageUrls?.[0]);

  if (imageUrls?.length === 0) return null;
  return (
    <div className="mb-8 max-w-3xs mx-auto lg:mx-0">
      <div className="w-full lg:w-[240px]">
        <img
          src={selectedUrl}
          alt={title}
          className="w-ful h-auto object-cover rounded-lg shadow-md min-h-96 w-full"
        />
      </div>

      <div className="grid grid-cols-3 mt-3.5 gap-[9px]">
        {imageUrls
          ?.filter((_, index) => index < 3)
          ?.map((imageUrl, index) => (
            <img
              src={imageUrl}
              alt=""
              className={cn(
                "rounded-lg border-2 border-transparent cursor-pointer h-14 w-full",
                imageUrl === selectedUrl && "border-[#F15822]"
              )}
              key={index}
              onClick={() => setSelectedUrl(imageUrl)}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductImage;
