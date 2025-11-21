import React, { useState } from "react";
import type { Product } from "../../../utils/schema";
import { CartIcon } from "../../../components/icons";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { title, currentPrice, originalPrice, description } = product;
  const [quantity, setQuantity] = useState(1)
        const { addToCart } = useCart();

        const handleAddtToCart = () => {
          addToCart(product, quantity);
        };  
  

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4.5">{title}</h1>
      <div className="flex items-center mb-4.5">
        <span className="text-3xl font-bold text-black mr-4">
          ₦{currentPrice.toLocaleString()}
        </span>
        <span className="text-xl text-red-600 line-through">
          ₦{originalPrice.toLocaleString()}
        </span>
      </div>
      <p className="font-bold">Description</p>
      <p className="text-gray-700 mb-5 mt-3 border-b pb-4.5">{description}</p>

      {/* Size Selector */}
      <div className="mb-5 border-b pb-4.5">
        <h4 className="font-semibold mb-2">Select size</h4>
        <div className="flex space-x-2">
          {["XXS", "S", "M", "L"].map((size) => (
            <button
              key={size}
              className="px-4 py-2 bg-[#FFF1EE] rounded-full hover:bg-(--color-primary) focus:bg-(--color-primary) hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="mb-5 border-b pb-4.5">
        <h4 className="font-semibold mb-2">Select color</h4>
        <div className="flex space-x-2">
          {["#FF0000", "#00FF00", "#0000FF"].map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className="w-8 h-8 rounded-full border-2 group border-transparent flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <Check className=" text-white group-focus:opacity-100 opacity-0" size={20}/>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity and Checkout */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-between border rounded-md py-1 px-2 w-32">
          <Minus className="cursor-pointer" onClick={()=>setQuantity(prev => prev - 1)}/>
          <span className="px-4 py-2">{quantity}</span>
          <Plus className="cursor-pointer" onClick={()=>setQuantity(prev => prev + 1)}/>
        </div>
        <Button onClick={handleAddtToCart} size={"lg"} className=" text-white px-6 py-6 text-lg rounded-md hover:bg-orange-600 grow">
          Quick checkout
        </Button>
        <button className="p-3 border border-black/60 rounded-full hover:bg-gray-100">
          <CartIcon className="h-6 w-6" />
        </button>
      </div>
      <p className="text-sm mt-2">
        The discount offer of 20% has been automatically applied to your order
        total.
      </p>
    </div>
  );
};

export default ProductDetails;
