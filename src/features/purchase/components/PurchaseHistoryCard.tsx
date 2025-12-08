import { CalendarDays, Copy, Eye, MailOpen, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { PurchaseHistoryItem } from "@/services/profile/types";
import { capitalizeText } from "@/utils/textUtils";

const PurchaseHistoryCard = ({ item }: { item: PurchaseHistoryItem }) => {
  const [status] = useState(item.status);
  const getColorScheme = (status: string) => {
    switch (status) {
      case "PENDING":
        return { textColor: "#494747", backgroundColor: "#E5E9EB" };
      case "EXPIRED":
        return { textColor: "#FFFFFF", backgroundColor: "#FF0800" };
      case "REDEEMED":
        return { textColor: "#FFFFFF", backgroundColor: "#73BF45" };
      default:
        return { textColor: "#494747", backgroundColor: "#E5E9EB" };
    }
  };

  return (
    <div className="rounded-[10px] px-6 py-4 bg-white border border-[#F4F6F5]">
      <p
        className="w-fit rounded-full px-2.5 py-1.5 mb-3 text-sm font-semibold"
        style={{
          backgroundColor: getColorScheme(status).backgroundColor,
          color: getColorScheme(status).textColor,
        }}
      >
        {capitalizeText(status)}
      </p>
      <div className="flex mb-6 items-center gap-2.5">
        <img
          src={item?.imageUrls?.[0]}
          alt=""
          className="w-2/5 rounded-[10px] h-24 border"
        />
        <div className="">
          <h3 className="text-[22px] font-semibold mb-2 leading-7">
            {item.offerName}
          </h3>
          <p className="text-xs">Sold by {capitalizeText(item.soldBy)}</p>
        </div>
      </div>
      <div
        className="h-24 flex flex-col items-center justify-center rounded-[10px]"
        style={{
          backgroundColor: status === "REDEEMED" ? "#E9F8E0" : "#FAFAFA",
        }}
      >
        <p className="text-xs">Your voucher code</p>
        <p
          className={cn("text-3xl font-bold flex gap-3 items-center", {
            "text-[#73BF45]": status === "REDEEMED",
            "text-[#FF0800]": status === "EXPIRED" || status === "USED",
          })}
        >
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
      <div className="flex items-center justify-between gap-3 mt-4">
        <p className="flex items-center gap-1.5 text-sm">
          <CalendarDays size={18} />
          Expires in 15 days
        </p>
        <p className="flex items-center gap-1.5 text-sm">
          <Eye size={18} className="cursor-pointer" />
          View terms
        </p>
        <p className="flex items-center gap-4 text-sm">
          <Phone size={18} className="cursor-pointer" />
          <MailOpen size={18} className="cursor-pointer" />
        </p>
      </div>
    </div>
  );
};

export default PurchaseHistoryCard;
