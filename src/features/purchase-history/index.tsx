import { useWishlist } from "@/context";
import ProductCard from "../products/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const PurchaseHistory = () => {
  const [tabValue, setTabValue] = useState("all");

  const { wishlistItems } = useWishlist();

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <div className="flex items-center justify-between mb-20">
        <div className="">
          <h1 className="text-4xl font-semibold mb-3.5">Purchase history</h1>
          <p className="text-lg">Manage your purchases and vouchers codes</p>
        </div>
        <Tabs defaultValue={tabValue} onValueChange={setTabValue} className=" ">
          <TabsList className="bg-white rounded-full">
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="all"
            >
              All vouchers
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="redeemed"
            >
              Redeemed
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="pending"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="expired"
            >
              Expired
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            Your're yet to make a purchase.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative group h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      <div className="py-20 flex items-center justify-center">
        <Button asChild className="rounded-full text-lg px-36" size={"lg"}>
          <Link to={"/"}>Continue Shopping</Link>
        </Button>
      </div>
    </main>
  );
};

export default PurchaseHistory;
