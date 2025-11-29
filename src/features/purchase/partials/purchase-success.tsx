import cake from "@/assets/cake.png";
import { Button } from "@/components/ui/button";
import { useGetTransaction } from "@/services/profile/queries";
import { Copy, MailOpen, Phone } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const PurchaseSuccess = () => {
  const [params] = useSearchParams();
  const id = params.get("transactionId");
  const useGetTransactionData = useGetTransaction(id ?? "");
  const { data } = useGetTransactionData();
  console.log({ data });

  return (
    <div className="container mx-auto px-6 pb-32 py-48 flex items-center justify-center">
      <div className="rounded-[10px] pt-9 py-5 bg-white border border-[#F4F6F5] w-lg">
        <div className="px-6">
          <h2 className="text-center text-3xl font-bold mb-14">
            Purchase Successful
          </h2>
          <div className="flex mb-6 items-center gap-2.5">
            <img src={cake} alt="" className="w-1/3 rounded-[10px]" />
            <div className="flex-1">
              <h3 className="text-[22px] font-semibold mb-2 leading-8">
                December Cake Madness
              </h3>
              <div className="flex items-center gap-4">
                <p className="text-xs">Sold by Mecury Cakes</p>
                <div className="flex items-center gap-2">
                  <Phone size={9} className="cursor-pointer" />
                  <MailOpen size={9} className="cursor-pointer" />
                </div>
              </div>
              <p className="text-[10px] text-[#808080]">
                Valid until 30 December, 2025
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-2 justify-between mb-4.5">
              <p>Original amount</p>
              <p>N16,000.00</p>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <p>Discount value paid</p>
              <p>N3,000.00</p>
            </div>
            <div className="flex justify-end">
              <p className=" px-3 py-0.5 text-xs bg-[#73BF451A] rounded-full mt-4.5 mb-3.5">
                You are saving 20%
              </p>
            </div>
          </div>
        </div>

        <hr />
        <div className="px-8 py-4.5">
          <div className="h-24 flex flex-col items-center justify-center rounded-[10px] bg-[#FAFAFA]">
            <p className="text-xs">Your voucher code</p>
            <p className="text-3xl font-bold flex gap-3 items-center text-[#F15822] mt-3">
              RC9900299382{" "}
              <Copy
                color="#000000"
                className="cursor-pointer"
                onClick={() => {
                  toast.success("Copied to clipboard");
                }}
              />
            </p>
          </div>
          <Button asChild className="w-full rounded-full mt-4.5" size={"lg"}>
            <Link to={"/purchase-history"}>Go to purchase history</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
