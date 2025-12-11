import { Button } from "@/components/ui/button";
import { usePreferences } from "@/context";
import { useGetTransaction } from "@/services/profile/queries";
import { capitalizeText, getCurrencySymbol } from "@/utils/textUtils";
import { format } from "date-fns";
import { CalendarDays, Copy, Download, MailOpen, Phone } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

import PurchaseSuccessSkeleton from "../components/PurchaseSuccessSkeleton";

const PurchaseSuccess = () => {
  const [params] = useSearchParams();
  const { selectedCurrency } = usePreferences();
  const id = params.get("transactionId");
  const useGetTransactionData = useGetTransaction(id ?? "");
  const { data, isLoading } = useGetTransactionData();

  if (isLoading) {
    return <PurchaseSuccessSkeleton />;
  }

  return (
    <div className="container mx-auto px-6 pb-32 py-48 flex gap-3 gap-y-6 items-center justify-center flex-wrap">
      {data?.map((item) => (
        <div
          key={item.offerId}
          className="rounded-[10px] pt-9 py-5 bg-white border border-[#F4F6F5] w-md"
        >
          <div className="px-6">
            <h2 className="text-center text-3xl font-bold mb-14">
              Purchase Successful
            </h2>
            <div className="flex mb-6 items-center gap-2.5">
              <img
                src={item?.imageUrls?.[0]}
                alt=""
                className="w-1/3 rounded-[10px] h-24"
              />
              <div className="flex-1">
                <h3 className="text-[22px] font-semibold mb-2 leading-7">
                  {item.offerName}
                </h3>
                <div className="flex items-center gap-4">
                  <p className="text-xs">
                    Sold by {capitalizeText(item.brandName)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Phone size={9} className="cursor-pointer" />
                    <MailOpen size={9} className="cursor-pointer" />
                  </div>
                </div>
                <p className="text-[10px] text-[#808080]">
                  Valid until{" "}
                  {format(item.offerEndDate ?? new Date(), "dd MMM, yyyy")}
                </p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-2 justify-between mb-4.5">
                <p>Original amount</p>
                <p>
                  {getCurrencySymbol(selectedCurrency)}
                  {(item.actualPrice ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <p>Discount value paid</p>
                <p>
                  {getCurrencySymbol(selectedCurrency)}
                  {(item.discountedPricePaid ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-end">
                <p className=" px-3 py-0.5 text-xs bg-[#73BF451A] rounded-full mt-4.5 mb-3.5">
                  You saved {getCurrencySymbol(selectedCurrency)}
                  {(item.discountValue ?? 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <hr />
          <div className="px-8 py-4.5">
            <div className="h-24 flex flex-col items-center justify-center rounded-[10px] bg-[#FAFAFA]">
              <p className="text-xs">Your voucher code</p>
              <p className="text-3xl font-bold flex gap-3 items-center text-[#F15822] mt-3">
                {item.voucherCode}{" "}
                <Copy
                  color="#000000"
                  className="cursor-pointer"
                  onClick={() => {
                    copy(item.voucherCode);
                    toast.success("Copied to clipboard");
                  }}
                />
              </p>
            </div>
            <div className="w-full">
              {item.primaryButton !== "CHECKOUT" && (
                <Button
                  asChild
                  className="w-full rounded-full mt-4.5"
                  size={"lg"}
                >
                  <Link to={"/purchase-history"}>
                    {item.primaryButton === "DOWNLOAD" ? (
                      <>
                        <Download /> Download resource
                      </>
                    ) : (
                      <>
                        <CalendarDays />
                        Book now
                      </>
                    )}
                  </Link>
                </Button>
              )}
              <Button
                asChild
                className="w-full rounded-full mt-4.5 bg-[#FEF7F4] text-[#F15822] border border-[#F15822]"
                size={"lg"}
              >
                <Link to={"/purchase-history"}>Go to purchase history</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseSuccess;
