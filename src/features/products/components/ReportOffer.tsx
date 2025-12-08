import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

interface ReportOfferProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const reasons = [
  "Invalid or misleading pricing",
  "False advertising / misleading information",
  "Scam or fraudulent activity",
  "Expired or no longer available but still being advertised",
  "Offensive or inappropriate content",
  "Vendor failed to honour the offer in-store or online",
  "Duplicate or spam listing",
  "Others",
];
const ReportOffer: React.FC<ReportOfferProps> = ({ open, onOpenChange }) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const { productId } = useParams();

  const handleReportOffer = () => {
    console.log(selectedReason, productId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-xl rounded-2xl p-0 overflow-hidden"
        // hideCloseButton
      >
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-xl font-semibold">
            Report this offer
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">
          <p className="text-[#494747]">
            Help us keep RewardClan safe and trustworthy. Tell us what’s wrong
            with this offer — our team will review it and take appropriate
            action.
          </p>

          <RadioGroup
            value={selectedReason}
            onValueChange={setSelectedReason}
            className="space-y-2 mt-8"
          >
            {reasons.map((reason, i) => (
              <div key={reason} className="flex items-center gap-2">
                <RadioGroupItem
                  value={reason}
                  id={`reason-${i}`}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`reason-${i}`}
                  className="text-base! font-normal! cursor-pointer flex-1 mb-0"
                >
                  {reason}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8">
            <Label className="text-base font-semibold mb-2 block">
              Additional details (optional)
            </Label>
            <textarea
              placeholder="Tell us anything else that will help us understand this issue…"
              className="w-full border border-[#DDE0EB] rounded-lg py-3 text-sm min-h-24 px-4"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          <Button
            onClick={handleReportOffer}
            disabled={!selectedReason}
            className="w-full py-6 text-base font-semibold rounded-xl bg-(--color-primary) hover:bg-orange-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Report Offer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportOffer;
