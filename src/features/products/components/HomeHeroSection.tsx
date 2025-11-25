import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#D9D9D9] py-40">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        {/* Left Content */}
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            Find the best offers and discounts online
          </h1>
          <p className="text-lg text-gray-600 mb-10 text-center">
            Shop exclusive deals from your favorite brands. Save more,
            instantly.
          </p>
        </div>
        <Button asChild size={"lg"} className="rounded-full px-12">
          <Link to="/products">
            Explore All offers <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
