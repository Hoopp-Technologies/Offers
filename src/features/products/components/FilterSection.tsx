import React, { useState } from "react";
import { FilterIcon } from "../../../components/icons";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterModal from "@/features/home/components/FilterModal";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ClockFading,
  LayoutList,
  Megaphone,
} from "lucide-react";
import { useGetTopCategories } from "@/services/products/queries";

const FilterSection: React.FC = () => {
  const { data: categories } = useGetTopCategories();

  const [open, setOpen] = useState(false);
  const sortOptions = [
    { text: "Popularity", icon: <Megaphone size={18} color="#808080" /> },
    { text: "Newest", icon: <LayoutList size={18} color="#808080" /> },
    {
      text: "Highest discount",
      icon: <ArrowUpNarrowWide size={18} color="#808080" />,
    },
    {
      text: "Lowest price",
      icon: <ArrowDownWideNarrow size={18} color="#808080" />,
    },
    { text: "Expiring soon", icon: <ClockFading size={18} color="#808080" /> },
  ];

  return (
    <section className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Apply Filter Button */}
        <Button
          className="rounded-full bg-white text-black hover:text-white"
          onClick={() => setOpen(true)}
        >
          <FilterIcon className="h-5 w-5 mr-2" />
          Apply filter
        </Button>

        {/* Category Pills */}
        <div className="flex gap-y-2 flex-wrap justify-center md:justify-start space-x-2 mb-4 md:mb-0">
          {categories?.map((category) => (
            <span
              key={category}
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm cursor-pointer hover:bg-gray-300"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <Select defaultValue="Popularity">
            <SelectTrigger className="w-[180px] bg-muted">
              <SelectValue placeholder="Select order option" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option, i) => (
                <SelectItem key={i} value={option.text}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    {option.text}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <FilterModal open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default FilterSection;
