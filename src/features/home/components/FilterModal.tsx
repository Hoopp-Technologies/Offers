import { useState, type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplet, List, Tag, Calendar } from "lucide-react";

const FilterModal = ({ open, onOpenChange }: {open : boolean, onOpenChange :  Dispatch<SetStateAction<boolean>>}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("Experience");
  const [discountType, setDiscountType] = useState("Percentage");
  const [offerDuration, setOfferDuration] = useState("24 hours");

  const categories = ["Beauty & wellness", "Experience"];
  const discountTypes = ["Percentage", "Flat fee"];
  const durations = ["24 hours", "48 hours", "7 days", "14 days"];

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("Experience");
    setDiscountType("Percentage");
    setOfferDuration("24 hours");
  };

  const handleApplyFilter = () => {
    console.log({ minPrice, maxPrice, category, discountType, offerDuration });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Apply filter</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Pricing</span>
            </div>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Min - N0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="flex-1"
              />
              <span className="text-gray-400">-</span>
              <Input
                placeholder="Max - N0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <List className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Category</span>
            </div>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Type */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Discount type</span>
            </div>
            <div className="flex gap-2">
              {discountTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setDiscountType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    discountType === type
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Offer Ending Within */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Offer ending within</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => setOfferDuration(duration)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    offerDuration === duration
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClearFilter}
            className="flex-1"
          >
            Clear filter
          </Button>
          <Button
            onClick={handleApplyFilter}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Apply filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;