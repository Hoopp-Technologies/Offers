import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import PurchaseHistoryCard from "../components/PurchaseHistoryCard";
import PurchaseHistorySkeleton from "../components/PurchaseHistorySkeleton";
import { useGetPurchaseHistory } from "@/services/profile/queries";

const PurchaseHistory = () => {
  const [tabValue, setTabValue] = useState<"ALL" | "PENDING" | "CLAIMED">(
    "ALL"
  );
  const handleTabChange = (value: string) => {
    setTabValue(value as "ALL" | "PENDING" | "CLAIMED");
  };
  const { data, isLoading, refetch, isRefetching } = useGetPurchaseHistory({
    queryParams: {
      status: tabValue,
      pageNumber: 0,
    },
  });

  useEffect(() => {
    refetch();
  }, [tabValue]);

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <div className="flex items-center justify-between mb-20">
        <div className="">
          <h1 className="text-4xl font-semibold mb-3.5">Purchase history</h1>
          <p className="text-lg">Manage your purchases and vouchers codes</p>
        </div>
        <Tabs
          defaultValue={tabValue}
          onValueChange={handleTabChange}
          className=" "
        >
          <TabsList className="bg-white rounded-full">
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="ALL"
            >
              All vouchers
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="CLAIMED"
            >
              Redeemed
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="PENDING"
            >
              Pending
            </TabsTrigger>
            {/* <TabsTrigger
              className="data-[state=active]:bg-[#F158220D] data-[state=active]:text-(--color-primary) px-10 rounded-full"
              value="expired"
            >
              Expired
            </TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>

      {isLoading || isRefetching ? (
        <PurchaseHistorySkeleton />
      ) : data?.content?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            {tabValue === "PENDING"
              ? "You have no pending purchases."
              : tabValue === "CLAIMED"
              ? "You have no redeemed vouchers."
              : "You're yet to make a purchase."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {data?.content?.map((item) => (
            <div key={item.offerId} className="relative group h-full">
              {/* <ProductCard product={product} /> */}
              <PurchaseHistoryCard item={item} />
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
