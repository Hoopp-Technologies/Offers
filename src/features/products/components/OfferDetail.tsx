import { CalendarDays, Percent } from "lucide-react";
import React from "react";
import type { ProductData } from "@/services/products/types";
import { format } from "date-fns";
import { capitalizeText } from "@/utils/textUtils";

const OfferDetail: React.FC<{ data: ProductData }> = ({ data }) => {
  return (
    <div>
      <div className="border border-red-300 rounded-lg p-4">
        <h4 className="font-bold text-lg mb-4">Offer detail</h4>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span>
              Enjoy{" "}
              <strong>
                {data.price?.percentageSaved ?? data.price.discountValue}%
                discount
              </strong>{" "}
              on your purchase when you spend a minimum of ₦5,000 on selected
              items.
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <CalendarDays color="#808080" />
            <span>
              Discount offer ends on{" "}
              <strong>
                {format(data.offerEnds ?? new Date(), "dd MMM, yyyy")}
              </strong>
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <Percent color="#808080" />
            <span>
              Enjoy {data?.price?.percentageSaved ?? data.price.discountValue}%
              off on this discount offer.
            </span>
          </li>
        </ul>
        <div className="mt-6 border-t pt-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#D9D9D9] rounded-full">&nbsp;</div>
          <div className="">
            <p className="text-sm text-gray-600">Sold by</p>
            <p className="font-semibold">{capitalizeText(data?.brandName)}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {data?.numberOfClaims > 0 && (
          <div className="flex -space-x-1 mr-3 text-white [&>p]:flex [&>p]:justify-center [&>p]:items-center [&>p]:h-8 [&>p]:w-8 [&>p]:rounded-full [&>p]:ring-2 [&>p]:ring-white [&>p]:bg-(--color-primary) [&>p]:text-center">
            <p>K</p>
            <p>M</p>
            <p>C</p>
          </div>
        )}
        <p className="text-sm text-gray-600">
          {data?.numberOfClaims ?? 0} people have REDEEMED this offer.
        </p>
      </div>
    </div>
  );
};

export default OfferDetail;
